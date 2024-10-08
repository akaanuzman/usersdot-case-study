import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { UpdateUserDTO } from 'src/users/dto/update-user.dto';
import { HashHelper } from 'src/helpers/hash.helper';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) { }

    /**
     * @description Get users from the database with pagination and search
     * @param page - page number default 1
     * @param pageSize - number of items per page default 10
     * @param search - search term default empty
     * @returns {Promise<{ users: any[], totalPages: number, totalCount: number }>} - list of users with pagination info
     */
    async getUsers(page: number, pageSize: number, search: string): Promise<{ users: any[], totalPages: number, totalCount: number }> {
        const offset = (page - 1) * pageSize;

        let query = 'SELECT * FROM User';
        const queryParams: any[] = [];

        if (search) {
            query += ' WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?';
            const searchTerm = `%${search}%`;
            queryParams.push(searchTerm, searchTerm, searchTerm);
        }

        const [totalCountResult] = await this.databaseService.connection
            .query(`SELECT COUNT(*) as total FROM User${search ? ' WHERE name LIKE ? OR surname LIKE ? OR email LIKE ?' : ''}`, queryParams);
        const totalCount = totalCountResult[0].total;

        const totalPages = Math.ceil(totalCount / pageSize);

        query += ` LIMIT ${pageSize} OFFSET ${offset}`;

        const [rows] = await this.databaseService.connection.query(query, queryParams) as any[];
        return { users: rows, totalPages, totalCount };
    }

    /**
     * @description Get a user by id
     * @param id - user id
     * @returns {Promise<any>} - user object
     */
    async getUserById(id: number): Promise<any> {
        const query = 'SELECT * FROM User WHERE id = ?';
        const [rows] = await this.databaseService.connection.query(query, [id]);
        return rows[0];
    }

    /**
     * @description Create a new user to the database
     * @param createUserDTO - user data from the request body
     * @returns {Promise<any>} - user object if created successfully or throws an error
     */
    async saveUser(createUserDTO: CreateUserDTO): Promise<any> {
        const hashedPassword = await HashHelper.hashPassword(createUserDTO.password);
        const query = 'INSERT INTO User (name, surname, email, password, phone, age, country, district, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const params = [
            createUserDTO.name,
            createUserDTO.surname,
            createUserDTO.email,
            hashedPassword,
            createUserDTO.phone,
            createUserDTO.age,
            createUserDTO.country,
            createUserDTO.district,
            createUserDTO.role,
        ];

        try {
            const result: any = await this.databaseService.connection.query(query, params);
            if (result[0].affectedRows === 0) {
                throw new BadRequestException('User could not be created');
            }
            const createdUser = await this.getUserById(result[0].insertId);
            return createdUser;
        } catch (error) {
            throw new BadRequestException('An error occurred while creating a user:' + error.message);
        }
    }

    /**
     * @description Update a user in the database
     * @param updateUserDTO - user data from the request body
     * @returns - user object if updated successfully or throws an error
     */
    async updateUser(updateUserDTO: UpdateUserDTO): Promise<any> {
        const { id, password, ...updateFields } = updateUserDTO;

        // if password is provided, hash it
        if (password) {
            const hashedPassword = await HashHelper.hashPassword(password);
            updateFields['password'] = hashedPassword;
        }

        const query = `UPDATE User SET ? WHERE id = ?`;
        const params = [updateFields, id];

        try {
            const result: any = await this.databaseService.connection.query(query, params);
            if (result[0].affectedRows === 0) {
                throw new NotFoundException('User not found');
            }
            const updatedUser = await this.getUserById(id);
            return updatedUser;
        } catch (error) {
            throw new BadRequestException('User could be not updated' + error.message);
        }
    }

    /**
     * @description Delete a user from the database
     * @param id - user id
     * @returns - true if user is deleted successfully, false if user is not found
     */
    async deleteUser(id: number): Promise<boolean> {
        try {
            // delete user from the database
            const result: any = await this.databaseService.connection.query('DELETE FROM User WHERE id = ?', [id]);
            
            if (result[0].affectedRows === 0) {
                return false;  // user not found
            }

            // reset auto increment to avoid gaps
            const [countResult] = await this.databaseService.connection.query('SELECT COUNT(*) AS count FROM User');
            const count = countResult[0].count;

            if (count === 0) {
                await this.databaseService.connection.query('ALTER TABLE User AUTO_INCREMENT = 1');
            }

            return true;
        } catch (error) {
            throw new BadRequestException('User could be not deleted: ' + error.message);
        }
    }
}

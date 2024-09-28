import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateUserDTO } from 'src/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

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
     * 
     * @param CreateUserDTO - user data from the request body
     * @returns {Promise<any>} - user object
     */
    async saveUser(createUserDTO: CreateUserDTO): Promise<any> {
        const hashedPassword = await bcrypt.hash(createUserDTO.password, 10);
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
                throw new BadRequestException('User could not be saved');
            }
            return { id: result.insertId, ...CreateUserDTO };
        } catch (error) {
            throw new BadRequestException('An error occurred while creating a user:' + error.message);
        } 
    }
}

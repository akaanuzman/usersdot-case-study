import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

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
}

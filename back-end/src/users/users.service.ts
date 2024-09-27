import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UsersService {
    constructor(private readonly databaseService: DatabaseService) { }

    /**
     * @description Get users from the database with pagination and search
     * @param page - page number 
     * @param pageSize - number of items per page
     * @param search - search term
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
}

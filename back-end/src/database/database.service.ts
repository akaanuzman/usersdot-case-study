import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import DatabaseConfig from './database.config';

@Injectable()
export class DatabaseService implements OnModuleInit {
    private connection: mysql.Connection;
    private dbConfig: DatabaseConfig;

    async onModuleInit() {
        await this.connectDatabase();
        await this.createDatabase();
        await this.createUsersTable();
        await this.insertMockData();
    }

    /**
     * @description Connect to the database
     * @returns {Promise<void>}
     */
    private async connectDatabase(): Promise<void> {
        this.dbConfig = DatabaseConfig.getInstance();
        this.connection = await mysql.createConnection(this.dbConfig);
        console.log('Connected to the database');
    }

    /**
     * @description Create database if not exists and use it
     * @returns {Promise<void>}
     */
    private async createDatabase(): Promise<void> {
        const dbName = process.env.DB_NAME;
        await this.connection.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`);
        await this.connection.query(`USE ${dbName}`);
        console.log(`Database ${dbName} is ready`);
    }

    /**
     * @description Create users table if not exists
     * @returns {Promise<void>}
     */
    private async createUsersTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS User (
            id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
            name VARCHAR(50) NOT NULL,
            surname VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) NOT NULL,
            phone VARCHAR(15) NOT NULL,
            age INT,
            country VARCHAR(100),
            district VARCHAR(100),
            role VARCHAR(10),
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `;
        await this.connection.query(query);
        console.log('Users table is ready');
    }

    /**
     * @description Clear users table before inserting mock data
     * @returns {Promise<void>}
     */
    private async clearMockData(): Promise<void> {
        await this.connection.query('DELETE FROM User');
        console.log('Users table cleared');
    }

    /**
     * @description Insert mock data to the users table
     * @returns {Promise<void>}
     */
    private async insertMockData(): Promise<void> {
        await this.clearMockData();
        const mockUsers = [
            { name: 'John', surname: 'Doe', email: 'john.doe@example.com', password: '123456', phone: '1234567890', age: 30, country: 'USA', district: 'District 1', role: 'user' },
            { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', password: '123456', phone: '1234567890', age: 25, country: 'USA', district: 'District 2', role: 'user' },
            { name: 'Admin', surname: 'Admin', email: 'admin.admin@example.com', password: '123456', phone: '1234567890', age: 35, country: 'USA', district: 'District 3', role: 'admin' },
        ];

        for (const user of mockUsers) {
            await this.connection.query('INSERT INTO User SET ?', user);
        }
        console.log('Mock data inserted');
    }
}

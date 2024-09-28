import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import DatabaseConfig from './database.config';
import { HashHelper } from 'src/helpers/hash.helper';
import { MockUserService } from 'src/mock/mock-user.service';

@Injectable()
export class DatabaseService implements OnModuleInit {
    connection: mysql.Connection;
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
        // Create users table if not exists with columns
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
        await this.connection.query('ALTER TABLE User AUTO_INCREMENT = 1');
        console.log('Users table cleared and AUTO_INCREMENT reset to 1');
    }

    /**
     * @description Insert mock data to the users table
     * @returns {Promise<void>}
     */
    private async insertMockData(): Promise<void> {
        // Clear mock data before inserting because email is unique
        await this.clearMockData();

        // Get mock users
        const mockUsers = MockUserService.getInstance().getUsers();

        // Hash passwords before inserting and insert to the users table
        for (const user of mockUsers) {
            const hashedPassword = await HashHelper.hashPassword(user.password);
            user.password = hashedPassword;
            await this.connection.query('INSERT INTO User SET ?', user);
        }
        console.log('Mock data inserted');
    }
}

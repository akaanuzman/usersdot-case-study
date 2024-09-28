import { Injectable, OnModuleInit } from '@nestjs/common';
import * as mysql from 'mysql2/promise';
import DatabaseConfig from './database.config';

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
        await this.clearMockData();
        const mockUsers = [
            { name: 'John', surname: 'Doe', email: 'john.doe@example.com', password: '123456', phone: '1234567890', age: 30, country: 'USA', district: 'District 1', role: 'user' },
            { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', password: '123456', phone: '1234567890', age: 25, country: 'USA', district: 'District 2', role: 'user' },
            { name: 'Alice', surname: 'Smith', email: 'alice.smith@example.com', password: '123456', phone: '1234567890', age: 28, country: 'USA', district: 'District 4', role: 'user' },
            { name: 'Bob', surname: 'Brown', email: 'bob.brown@example.com', password: '123456', phone: '1234567890', age: 32, country: 'USA', district: 'District 5', role: 'user' },
            { name: 'Charlie', surname: 'Davis', email: 'charlie.davis@example.com', password: '123456', phone: '1234567890', age: 22, country: 'USA', district: 'District 6', role: 'user' },
            { name: 'David', surname: 'Evans', email: 'david.evans@example.com', password: '123456', phone: '1234567890', age: 27, country: 'USA', district: 'District 7', role: 'user' },
            { name: 'Eve', surname: 'Foster', email: 'eve.foster@example.com', password: '123456', phone: '1234567890', age: 29, country: 'USA', district: 'District 8', role: 'user' },
            { name: 'Frank', surname: 'Garcia', email: 'frank.garcia@example.com', password: '123456', phone: '1234567890', age: 31, country: 'USA', district: 'District 9', role: 'user' },
            { name: 'Grace', surname: 'Harris', email: 'grace.harris@example.com', password: '123456', phone: '1234567890', age: 26, country: 'USA', district: 'District 10', role: 'user' },
            { name: 'Hank', surname: 'Ivy', email: 'hank.ivy@example.com', password: '123456', phone: '1234567890', age: 33, country: 'USA', district: 'District 11', role: 'user' },
            { name: 'Ivy', surname: 'Jones', email: 'ivy.jones@example.com', password: '123456', phone: '1234567890', age: 24, country: 'USA', district: 'District 12', role: 'user' },
            { name: 'Jack', surname: 'King', email: 'jack.king@example.com', password: '123456', phone: '1234567890', age: 34, country: 'USA', district: 'District 13', role: 'user' },
            { name: 'Karen', surname: 'Lee', email: 'karen.lee@example.com', password: '123456', phone: '1234567890', age: 23, country: 'USA', district: 'District 14', role: 'user' },
            { name: 'Leo', surname: 'Miller', email: 'leo.miller@example.com', password: '123456', phone: '1234567890', age: 30, country: 'USA', district: 'District 15', role: 'user' },
            { name: 'Mia', surname: 'Nelson', email: 'mia.nelson@example.com', password: '123456', phone: '1234567890', age: 28, country: 'USA', district: 'District 16', role: 'user' },
            { name: 'Nina', surname: 'Owen', email: 'nina.owen@example.com', password: '123456', phone: '1234567890', age: 27, country: 'USA', district: 'District 17', role: 'user' },
            { name: 'Oscar', surname: 'Parker', email: 'oscar.parker@example.com', password: '123456', phone: '1234567890', age: 32, country: 'USA', district: 'District 18', role: 'user' },
            { name: 'Paul', surname: 'Quinn', email: 'paul.quinn@example.com', password: '123456', phone: '1234567890', age: 25, country: 'USA', district: 'District 19', role: 'user' },
            { name: 'Quincy', surname: 'Reed', email: 'quincy.reed@example.com', password: '123456', phone: '1234567890', age: 29, country: 'USA', district: 'District 20', role: 'user' },
            { name: 'Admin', surname: 'Admin', email: 'admin.admin@example.com', password: '123456', phone: '1234567890', age: 35, country: 'USA', district: 'District 3', role: 'admin' },
        ];

        for (const user of mockUsers) {
            await this.connection.query('INSERT INTO User SET ?', user);
        }
        console.log('Mock data inserted');
    }
}

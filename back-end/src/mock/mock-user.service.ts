import MockUser from "./mock-user";

export class MockUserService {
    private users: MockUser[] = [
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
        { name: 'Admin', surname: 'Admin', email: 'admin.admin@example.com', password: '123456', phone: '1234567890', age: 35, country: 'USA', district: 'District 3', role: 'admin' }
    ];

    /**
     * @description Get the instance of the DatabaseConfig
     * @returns {MockUserService}
     */
    private static instance: MockUserService;

    /**
 * @description Get the instance of the DatabaseConfig singleton
    * @returns {DatabaseConfig}
    */
    static getInstance(): MockUserService {
        if (!MockUserService.instance) {
            MockUserService.instance = new MockUserService();
        }
        return MockUserService.instance;
    }


    /**
     * @description Get mock users
     * @returns {MockUser[]} - array of mock users
     */
    getUsers(): MockUser[] {
        return this.users;
    }

    /**
     * @description Add a mock user
     * @param {MockUser} user - mock user to add
     */
    deleteUsers(): void {
        this.users = [];
    }

}
## Installation
1. **Install Dependencies**

    Navigate to the `back-end` directory and install the required dependencies:

    ```sh
    cd back-end && npm i
    ```

2. **Setup MySQL**

    You can create .env file root directory and create configuration variables.

    **Create .env file root directory:**

    ```sh
    DB_HOST=<YOUR_HOST>
    DB_PORT=<YOUR_PORT>
    DB_USER=<YOUR_USER>
    DB_PASSWORD=<YOUR_PASSWORD>
    DB_NAME=<YOUR_DB_NAME>
    
    FRONTEND_URL=<YOUR_FRONTEND_URL
    PORT=<YOUR_BACK_END_PORT>
    ```
3. **Run the Application**

    To run the application, use the following command:

    ```sh
    npm run start
    ```

   - The back-end server will be available at `http://localhost:<YOUR_PORT_IN_ENV_FILE>`.
   - The MySQL server will be available at `http://localhost:<YOUR_DB_PORT_IN_ENV_FILE>`.
  

## Dependencies

```
{
    "bcrypt": "^5.1.1",
    "class-validator": "^0.14.1",
    "mysql2": "^3.11.3",
}
```

## User Table Schemas
<img width="896" alt="db scheme" src="https://github.com/user-attachments/assets/3327a111-e88f-4053-99ca-1eb1fb003dc1">

## API Endpoints

### User Endpoints

- **Add User**

    - **URL**: `/users/save`
    - **Method**: `POST`
    - **Headers**: `'Content-Type': 'application/json'`
    - **Body**:

      ```json
      {
          "name": "John",
          "surname": "Doe",
          "email": "johndoe@example.com",
          "password": "verysecretpassword123",
          "phone": "+905555555555",
          "age": 28,
          "country": "Turkey",
          "district": "İstanbul",
          "role": "user"
      }
      ```

    - **Response**:

      ```json
      {
          "id": "user_id",
          "name": "John",
          "surname": "Doe",
          "email": "johndoe@example.com",
          "password": "$2b$10$dkcsMOk2rSvgoyuBqb5dEuYTGeBMLlDKbqp3Mt1kQ5SzOeKcBNLwK",
          "phone": "+905555555555",
          "age": 28,
          "country": "Turkey",
          "district": "İstanbul",
          "role": "user"
          "createdAt": "2024-09-30T02:12:05.000Z",
          "updatedAt": "2024-09-30T02:12:05.000Z"
      }
      ```

- **Update User**

    - **URL**: `/users/update`
    - **Method**: `POST`
    - **Headers**: `'Content-Type': 'application/json'`
    - **Body**:

      ```json
      {
          "id": "user_id",
          "name": "Jay Jay",
          "surname": "Doe",
          "email": "johndoe@example.com",
          "password": "$2b$10$dkcsMOk2rSvgoyuBqb5dEuYTGeBMLlDKbqp3Mt1kQ5SzOeKcBNLwK",
          "phone": "+905555555555",
          "age": 12,
          "country": "USA",
          "district": "Cupertino",
          "role": "user"
      }
      ```

    - **Response**:

      ```json
      {
          "id": "user_id",
          "name": "Jay Jay",
          "surname": "Doe",
          "email": "johndoe@example.com",
          "password": "$2b$10$dkcsMOk2rSvgoyuBqb5dEuYTGeBMLlDKbqp3Mt1kQ5SzOeKcBNLwK",
          "phone": "+905555555555",
          "age": 12,
          "country": "USA",
          "district": "Cupertino",
          "role": "user"
          "createdAt": "2024-09-30T02:12:05.000Z",
          "updatedAt": "2024-09-30T02:14:41.000Z"
      }
      ```

- **Delete User**

    - **URL**: `/users/:id`
    - **Method**: `DELETE`
    - **Response**:

      ```json
      {
          "message": "User deleted successfully"
      }
      ```

- **Get All Users**

    - **URL**: `/users?page=1&pageSize=10&search=doe`
    - **Method**: `GET`
    - **Description**: `All 3 query parameters have default values. 1 for page, 10 for pageSize and ''' for search are empty strings. Optionally any of page, pageSize and search param can be sent.`
    - **Response**:

      ```json
      {
          "users": [
              {
                  "id": 1,
                  "name": "John",
                  "surname": "Doe",
                  "email": "john.doe@example.com",
                  "password": "$2b$10$Ii8JnJduP28udL5W8/wvuuvB9NnqD2RihjdU1gYfGmTGsdZvC6gGC",
                  "phone": "1234567890",
                  "age": 30,
                  "country": "USA",
                  "district": "District 1",
                  "role": "user",
                  "createdAt": "2024-09-30T02:19:51.000Z",
                  "updatedAt": "2024-09-30T02:19:51.000Z"
              },
              {
                  "id": 2,
                  "name": "Jane",
                  "surname": "Doe",
                  "email": "jane.doe@example.com",
                  "password": "$2b$10$PG..GbWhRcrsAOOETA0GR.5DiPjpQTs8sIPVM13EOzXlupNkLVqtK",
                  "phone": "1234567890",
                  "age": 25,
                  "country": "USA",
                  "district": "District 2",
                  "role": "user",
                  "createdAt": "2024-09-30T02:19:51.000Z",
                  "updatedAt": "2024-09-30T02:19:51.000Z"
              }
          ],
          "totalPages": 1,
          "totalCount": 2
      }
      ```

- **Get User by ID**

    - **URL**: `/users/:id`
    - **Method**: `GET`
    - **Response**:

      ```json
      {
          "id": 1,
          "name": "John",
          "surname": "Doe",
          "email": "john.doe@example.com",
          "password": "$2b$10$Ii8JnJduP28udL5W8/wvuuvB9NnqD2RihjdU1gYfGmTGsdZvC6gGC",
          "phone": "1234567890",
          "age": 30,
          "country": "USA",
          "district": "District 1",
          "role": "user",
          "createdAt": "2024-09-30T02:19:51.000Z",
          "updatedAt": "2024-09-30T02:19:51.000Z"
      }
      ```

    

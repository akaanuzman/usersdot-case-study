## Installation
1. **Install Dependencies**

    Navigate to the `front-end` directory and install the required dependencies:

    ```sh
    cd front-end && npm i
    ```

2. **Run the Application**

    To run the application, use the following command:

    ```sh
    npm start
    ```

   - The back-end server will be available at `http://localhost:<YOUR_PORT_IN_ENV_FILE>`.
   - The MySQL server will be available at `http://localhost:<YOUR_DB_PORT_IN_ENV_FILE>`.
   - The front-end will be available at `http://localhost:3000`.
  

## Dependencies

```
{
    "antd": "^5.21.1",
    "@ant-design/icons": "^5.5.1",
}
```

## Features
- **Implement dynamic page states**: Displaying separate ui components according to the loading, empty, full and error states on the pages
- **Components**: Simplify management by dividing into sub-components
- **Documentation**: Documenting most parts with comment lines
- **Createful UI**: UI developed with user experience in mind.

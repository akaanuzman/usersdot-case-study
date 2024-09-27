/**
 * @description This class is a singleton that holds the database configuration
 * @class DatabaseConfig
 */
export default class DatabaseConfig {
    /**
     * @description Database host
     */
    host: string;
    /**
     * @description Database port
     */
    port: number;
    /**
     * @description Database user
     */
    user: string;
    /**
     * @description Database password
     */
    password: string;

    /**
     * @description Private constructor to prevent multiple instances
     */
    private constructor() {
        this.host = process.env.DB_HOST;
        this.port = Number(process.env.DB_PORT);
        this.user = process.env.DB_USER;
        this.password = process.env.DB_PASSWORD;
    }

    /**
     * @description Get the instance of the DatabaseConfig
     * @returns {DatabaseConfig}
     */
    private static instance: DatabaseConfig;

    /**
     * @description Get the instance of the DatabaseConfig singleton
     * @returns {DatabaseConfig}
     */
    static getInstance(): DatabaseConfig {
        if (!DatabaseConfig.instance) {
            DatabaseConfig.instance = new DatabaseConfig();
        }
        return DatabaseConfig.instance;
    }
}


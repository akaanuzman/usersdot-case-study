import bcrypt from 'bcrypt';

/**
 * @description HashHelper class with static
 * methods to hash passwords
 * @class HashHelper
 */
export class HashHelper {
    /**
     * @description Number of salt rounds
     */
    private static readonly SALT_ROUNDS = 10;

    /**
     * @description Hash a password
     * @param {string} password - password to hash
     * @returns {Promise<string>} - hashed password
     */
    static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.SALT_ROUNDS);
    }
}

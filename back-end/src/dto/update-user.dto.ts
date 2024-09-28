/**
 * @description UpdateUserDTO is a Data Transfer Object that is used to update a user.
 */
export class UpdateUserDTO {
    /**
     * @description User's id required for update
     */
    id: number;

    /**
     * @description User's name optional because it is not required for update
     */
    name?: string;

    /**
     * @description User's surname optional because it is not required for update
     */
    surname?: string;

    /**
     * @description User's email optional because it is not required for update
     */
    email?: string;

    /**
     * @description User's password optional because it is not required for update
     * If password is provided, it will be hashed
     */
    password?: string;

    /**
     * @description User's phone optional because it is not required for update
     */
    phone?: string;

    /**
     * @description User's age optional because it is not required for update
     */
    age?: number;

    /**
     * @description User's country optional because it is not required for update
     */
    country?: string;

    /**
     * @description User's district optional because it is not required for update
     */
    district?: string;
    
    /**
     * @description User's role optional because it is not required for update
     */
    role?: string;
}
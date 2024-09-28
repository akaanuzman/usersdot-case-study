import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

/**
 * @description Data transfer object for creating a user in the database
 * with validation rules
 */
export class CreateUserDTO {
    /**
     * @description User's name required
     */
    @IsNotEmpty()
    @IsString()
    name: string;

    /**
     * @description User's surname required
     */ 
    @IsNotEmpty()
    @IsString()
    surname: string;

    /**
     * @description User's email required and must be a valid email
     */
    @IsNotEmpty()
    @IsEmail()
    email: string;

    /**
     * @description User's password required
     */
    @IsNotEmpty()
    @IsString()
    password: string;

    /**
     * @description User's phone required
     */
    @IsNotEmpty()
    @IsString()
    phone: string;

    /**
     * @description User's age optional
     */
    age?: number;

    /**
     * @description User's country optional
     */
    country?: string;

    /**
     * @description User's district optional
     */
    district?: string;

    /**
     * @description User's role optional
     */
    role?: string;
}


import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * @description UpdateUserDTO is a Data Transfer Object that is used to update a user.
 */
export class UpdateUserDTO {
    /**
     * @description User's id required for update
     */
    @IsNotEmpty()
    id: number;

    /**
     * @description User's name optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    name?: string;

    /**
     * @description User's surname optional because it is not required for update
     */
    @IsString()
    @IsOptional()
    surname?: string;

    /**
     * @description User's email optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string;

    /**
     * @description User's password optional because it is not required for update
     * If password is provided, it will be hashed
     */
    @IsOptional()
    @IsString()
    password?: string;

    /**
     * @description User's phone optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    phone?: string;

    /**
     * @description User's age optional because it is not required for update
     */
    @IsOptional()
    @IsNumber()
    age?: number;

    /**
     * @description User's country optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    country?: string;

    /**
     * @description User's district optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    district?: string;

    /**
     * @description User's role optional because it is not required for update
     */
    @IsOptional()
    @IsString()
    role?: string;
}
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    surname: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    age?: number;
    country?: string;
    district?: string;
    role?: string;
}


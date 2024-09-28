export class UpdateUserDTO {
    id: number;  // required for update
    name?: string;
    surname?: string;
    email?: string;
    password?: string;  // if password is provided, it will be hashed
    phone?: string;
    age?: number;
    country?: string;
    district?: string;
    role?: string;
}
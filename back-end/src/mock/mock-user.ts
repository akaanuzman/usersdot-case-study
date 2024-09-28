export default interface MockUser {
    name: string;
    surname: string;
    email: string;
    password: string;
    phone: string;
    age?: number;
    country?: string;
    district?: string;
    role?: string;
}
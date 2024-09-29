/**
 * @description Model for User
 */
export default class UserModel {
    constructor(id, name, surname, email, password, phone, age, country, district, role, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.age = age;
        this.country = country;
        this.district = district;
        this.role = role;
        this.createdAt = new Date(createdAt);
        this.updatedAt = new Date(updatedAt);
    }
}
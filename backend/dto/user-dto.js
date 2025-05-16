module.exports = class UserDto {
    name;
    phone;
    role;

    constructor(model) {
        this.name = model.name;
        this.phone = model.phone;
        this.role = model.role;
    }
}
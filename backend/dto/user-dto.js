module.exports = class UserDto {
    name;
    phone;
    role;
    _id;

    constructor(model) {
        this.name = model.name;
        this.phone = model.phone;
        this.role = model.role;
        this.id = model._id;
    }
}
export default class userDTO {
    constructor(user) {
        this._id = user._id;
        this.email = user.email;
        this.password = user.password;
        this.name = user.name;
        this.surname = user.surname;
        this.role = user.role;
        access= true;
    }
}

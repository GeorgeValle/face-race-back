class ProfileDTO {
    _id= "";
    email ="";
    name = "";
    surname="";
    role="";
    constructor(user) {
        this._id = user._id;
        this.email = user.email;
        this.name = user.name;
        this.surname = user.surname;
        this.role = user.role;
        this.access=false;
        this.error=null;
        this.loading=false;
    }
}

export default ProfileDTO
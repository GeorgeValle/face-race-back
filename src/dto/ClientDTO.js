class ClientDTO {
    _id="";
    email="";
    name="";
    surname="";
    adrress="";
    city="";
    province="";
    postalCode="";
    phone="";
    cel="";
    description="";

    constructor(client) {
        this._id = client._id;
        this.email = client.email;
        this.name = client.name;
        this.surname = client.surname;
        this.adrress = client.adrress;
        this.city = client.city;
        this.province = client.province;
        this.postalCode = client.postalCode;
        this.phone = client.phone;
        this.cel = client.cel;
        this.description = description;

        
    }
}

export default ClientDTO
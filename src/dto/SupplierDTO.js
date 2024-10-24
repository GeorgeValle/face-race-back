class SupplierDTO {
    _id= "";
    email ="";
    
    constructor(supplier) {
        this._id = supplier._id;
        this.email = supplier.email;
        this.cuil = supplier.email;
        this.businessName = supplier.businessName;
        this.companyName = supplier.companyName;
        this.coreBusiness = supplier.coreBusiness;
        this.address = supplier.address;
        this.city = supplier.city;
        this.province = supplier.province;
        this.postalCode = supplier.postalCode;
        this.phone = supplier.phone;
        this.cel= supplier.cel;
        this.description = supplier.description;
    }
}

export default SupplierDTO
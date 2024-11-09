import {MongoDAO} from './MongoDAO.js';
import SupplierModel from './models/SupplierModel.js';


//create the new class Supplier
class Supplier extends MongoDAO{ //extends methods in common
    constructor(){
        super(SupplierModel)
    }

    getSuppliersByName = async (letter_name, limit) => {
        try {

            let objDAO = await this.collection.find({
                businessName:{
                    $regex: letter_name,
                    $options: 'i'
                    }
                }).limit(limit).exec()
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

}

export default new Supplier
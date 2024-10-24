import {MongoDAO} from './MongoDAO.js';
import SupplierModel from './models/SupplierModel.js';


//create the new class Supplier
class Supplier extends MongoDAO{ //extends methodes in common
    constructor(){
        super(SupplierModel)
    }

}

export default new Supplier
import {MongoDAO} from './MongoDAO.js';
import SaleModel from './models/SaleModel.js';


//create the new class Sale
class Sale extends MongoDAO{ //extends methods in common
    constructor(){
        super(SaleModel)
    }

}

export default new Sale
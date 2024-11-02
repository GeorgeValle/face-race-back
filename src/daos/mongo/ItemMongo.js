import {MongoDAO} from './MongoDAO.js';
import ItemModel from './models/ItemModel.js';


//create the new class Item (Artículo)
class Item extends MongoDAO{ //extends methods in common
    constructor(){
        super(ItemModel)
    }

}

export default new Item
import {MongoDAO} from './MongoDAO.js';
import ItemModel from './models/ItemModel.js';


//create the new class Item (Artículo)
class Item extends MongoDAO{ //extends methods in common
    constructor(){
        super(ItemModel)
    }
    getOneItemByName = async letter_name => {
        try {

            let objDAO = await this.collection.find({
                name:{
                    $regex: letter_name,
                    $options: 'i'
                    }
                }).limit(1).exec()
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

    getItemsByName = async (letter_name, limit) => {
        try {

            let objDAO = await this.collection.find({
                name:{
                    $regex: letter_name,
                    $options: 'i'
                    }
                }).limit(limit).exec()
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

    getItemsByCategory = async (category_name, limit) => {
        try {

            let objDAO = await this.collection.find({
                category:{
                    $regex: category_name,
                    $options: 'i'
                    }
                }).limit(limit).exec()
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

}

export default new Item
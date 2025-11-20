import {MongoDAO} from './MongoDAO.js';
import ClientModel from './models/ClientModel.js';


//create the new class Client
class Client extends MongoDAO{ //extends methods in common
    constructor(){
        super(ClientModel)
    }

    getClientsByName = async (letter_name, limit) => {
        try {
            let objDAO = await this.collection.find({
                $or: [
                    { name: { $regex: letter_name, $options: 'i' } },
                    { surname: { $regex: letter_name, $options: 'i' } }
                ]
            }).limit(limit)
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }
}

export default new Client
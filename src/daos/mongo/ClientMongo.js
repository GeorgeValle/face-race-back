import {MongoDAO} from './MongoDAO.js';
import ClientModel from './models/ClientModel.js';


//create the new class Client
class Client extends MongoDAO{ //extends methods in common
    constructor(){
        super(ClientModel)
    }

}

export default new Client
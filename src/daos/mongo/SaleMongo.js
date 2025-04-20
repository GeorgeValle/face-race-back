import {MongoDAO} from './MongoDAO.js';
import SaleModel from './models/SaleModel.js';


//create the new class Sale
class Sale extends MongoDAO{ //extends methods in common
    constructor(){
        super(SaleModel)
    }

    getSalesByMonthAndYear = async (month, year) => {
        try {

            const firstDate = new Date(year, month-1,1);
            const lastDate = new Date(year, month,1);

            let objDAO = await this.collection.find({
                shiftDate:{
                    $gte: firstDate,
                    $lt: lastDate
                }
                })
                
            return objDAO
            
        } catch (err) {
            console.error(err);
            throw err;
        }
    }

}

export default new Sale
import {MongoDAO} from './MongoDAO.js';
import ReconditioningModel from './models/ReconditioningModel.js';


//create the new class Appointment (Turno)
class Reconditioning extends MongoDAO{ //extends methods in common
    constructor(){
        super(ReconditioningModel)
    }

    getReconditioningByMonthAndYear = async (month, year) => {
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

    updateReconditioningStatusByCurrentDate = async () => {
        try {

            const currentDate = new Date();
            

            let objDAO = await this.collection.updateMany({
                status:'pending',
                shiftDate:{$lt: currentDate}
                },
                { $set: { status: 'ready' } }
            )
            
                //   acknowledged: true,
                //   modifiedCount: 10,
                //   matchedCount: 15,
                //   upsertedCount: 0,
                //   upsertedId: null
                // }
            
            return {dbRead:objDAO.acknowledged}
            
        } catch (err) {
            
            throw err;
        }
    }

}

export default new Reconditioning


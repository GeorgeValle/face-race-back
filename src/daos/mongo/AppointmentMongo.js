import {MongoDAO} from './MongoDAO.js';
import AppointmentModel from './models/AppointmentModel.js';


//create the new class Appointment (Turno)
class Appointment extends MongoDAO{ //extends methods in common
    constructor(){
        super(AppointmentModel)
    }

    getAppointmentByMonthAndYear = async (month, year) => {
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

    updateAppointmentStatusByCurrentDate = async () => {
        try {

            const currentDate = new Date();
            

            let objDAO = await this.collection.updateMany({
                status:'pending',
                shiftDate:{$lt: currentDate}
                },
                { $set: { status: 'missing' } }
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

export default new Appointment


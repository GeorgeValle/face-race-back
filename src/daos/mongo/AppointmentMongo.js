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

}

export default new Appointment


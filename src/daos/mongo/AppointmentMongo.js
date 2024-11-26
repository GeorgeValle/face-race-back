import {MongoDAO} from './MongoDAO.js';
import AppointmentModel from './models/AppointmentModel.js';


//create the new class Appointment (Turno)
class Appointment extends MongoDAO{ //extends methods in common
    constructor(){
        super(AppointmentModel)
    }
    getAppointmentByIdClient = async IdClient => {
        try {

            let objDAO = await this.collection.find({
                IdClient
                }).populate('client');
            return objDAO
        } catch (err) {
            console.log(err.message);
        }
    }

}

export default new Appointment


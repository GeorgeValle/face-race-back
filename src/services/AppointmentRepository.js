

export default class AppointmentRepository {
    constructor(appointmentDAO) {
        this.appointmentDAO = appointmentDAO;

    }
    async createAppointment(data) {
        try {
            const appointment = await this.appointmentDAO.saveDataDAO(data);
            return appointment;
        } catch (error) {
            throw error;
        }
    }
    async getAppointmentById(id) {
        try {
            const appointment = await this.appointmentDAO.getByIdDAO(id);
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAllAppointments() {
        try {
            const appointment = await this.appointmentDAO.getAllDAO();
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentsByMonthAndYear(month, year) {
        try {
            const appointment = await this.appointmentDAO.getAppointmentByMonthAndYear(month,year);
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentsByShiftDate(selectedDate) {
        try {
            const appointment = await this.appointmentDAO.getByFieldDAO({shiftDate:selectedDate});
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async getAppointmentsByDateAndTime(selectedDate,selectedTime) {
        try {
            const appointment = await this.appointmentDAO.getByFieldDAO({shiftDate:selectedDate,timeSlot:selectedTime});
            return appointment;
        } catch (error) {
            throw error;
        }
    }
    
    

    async getOneAppointmentByIdClient(idClient){
        try{
            const appointment = await this.appointmentDAO.getAppointmentByIdClient(idClient)
            
            console.log("Repo: "+appointment)
            return appointment;
        }catch(error){
            throw error;
        }
    }

    async getOneAppointmentByShiftDate(selectedDate){
        try{
            const appointment = await this.appointmentDAO.getByFieldDAO({shiftDate:selectedDate});
            
    
            return appointment[0];
        }catch(error){
            throw error;
        }
    }

    async updateAppointmentById(id, data) {
        try {
            const appointment = await this.appointmentDAO.updateByIdDAO(data, {_id:id});
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async updateAppointmentByIdClient(idClient, data){
        try {
            const updatedAppointment = await this.appointmentDAO.updateOneDao(data,{client: idClient});
            return updatedAppointment
        }catch(error){
            throw error;
        }
    }
    async deleteAppointment(id) {
        try {
            const appointment = await this.appointmentDAO.deleteByIdDAO(id);
            return appointment;
        } catch (error) {
            throw error;
        }
    }

    async deleteAppointmentByIdClient(idClient){
        try{
            const appointment = await this.appointmentDAO.deleteByFieldDAO(idClient);
            return appointment;
        }catch(error){
            throw error;
        }
    }

}


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
            const appointment = await this.appointmentDAO.getAppointmentByMonthAndYear(month, year);
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
    
    async getOneAppointmentByShiftDate(selectedDate){
        try{
            const appointment = await this.appointmentDAO.getByFieldDAO({shiftDate:selectedDate});
            
    
            return appointment[0];
        }catch(error){
            throw error;
        }
    }

    async getAppointmentByDNI(dni){
        try{
            const appointment = await this.appointmentDAO.getByFieldDAO(dni);
            
            
            return appointment[0];
            
        }catch(error){
            throw error;
        }
    }

    async getAppointmentsByDNI(dni){
        try{
            const appointments = await this.appointmentDAO.getByFieldDAO(dni);
            
            
            return appointments;
            
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


    async updateAppointmentByDNI(dni, data){
        try {
            const updatedAppointment = await this.appointmentDAO.updateOneDao(data,{dni: dni});
            return updatedAppointment
        }catch(error){
            throw error;
        }
    }

    async updateAppointmentStatusByDate(){
        try{
            const {dbRead} = await this.appointmentDAO.updateAppointmentStatusByCurrentDate();
            
            
            if(dbRead){
                return true;
            }
            return false

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
}
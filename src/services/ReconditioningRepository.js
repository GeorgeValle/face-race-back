

export default class ReconditioningRepository {
    constructor(reconditioningDAO) {
        this.reconditioningDAO = reconditioningDAO;

    }
    async createReconditioning(data) {
        try {
            const reconditioning = await this.reconditioningDAO.saveDataDAO(data);
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }
    async getReconditioningById(id) {
        try {
            const reconditioning = await this.reconditioningDAO.getByIdDAO(id);
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }

    async getAllReconditionings() {
        try {
            const reconditioning = await this.reconditioningDAO.getAllDAO();
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }

    async getReconditioningsByMonthAndYear(month, year) {
        try {
            const reconditioning = await this.reconditioningDAO.getReconditioningByMonthAndYear(month, year);
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }

    async getReconditioningsByShiftDate(selectedDate) {
        try {
            const reconditioning = await this.reconditioningDAO.getByFieldDAO({shiftDate:selectedDate});
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }

    async getReconditioningsByDateAndTime(selectedDate,selectedTime) {
        try {
            const reconditioning = await this.reconditioningDAO.getByFieldDAO({shiftDate:selectedDate,timeSlot:selectedTime});
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }
    
    async getOneReconditioningByShiftDate(selectedDate){
        try{
            const reconditioning = await this.reconditioningDAO.getByFieldDAO({shiftDate:selectedDate});
            
    
            return reconditioning[0];
        }catch(error){
            throw error;
        }
    }

    async getReconditioningByDNI(dni){
        try{
            const reconditioning = await this.reconditioningDAO.getByFieldDAO(dni);
            
            
            return reconditioning[0];
            
        }catch(error){
            throw error;
        }
    }

    async updateReconditioningById(id, data) {
        try {
            const reconditioning = await this.reconditioningDAO.updateByIdDAO(data, {_id:id});
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }


    async updateReconditioningByDNI(dni, data){
        try {
            const updatedReconditioning = await this.reconditioningDAO.updateOneDao(data,{dni: dni});
            return updatedReconditioning
        }catch(error){
            throw error;
        }
    }

    async updateReconditioningStatusByDate(){
        try{
            const {dbRead} = await this.reconditioningDAO.updateReconditioningStatusByCurrentDate();
            
            
            if(dbRead){
                return true;
            }
            return false

        }catch(error){
            throw error;
        }
    }
    async deleteReconditioning(id) {
        try {
            const reconditioning = await this.reconditioningDAO.deleteByIdDAO(id);
            
            return reconditioning;
        } catch (error) {
            throw error;
        }
    }
}
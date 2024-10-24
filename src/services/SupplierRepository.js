import SupplierDTO from '../dto/SupplierDTO.js';


export default class SupplierRepository {
    constructor(supplierDAO) {
        this.supplierDAO = supplierDAO;

    }
    async createSupplier(data) {
        try {
            const supplier = await this.supplierDAO.saveDataDAO(data);
            return supplier;
        } catch (error) {
            throw error;
        }
    }
    async getSupplierById(id) {
        try {
            const supplier = await this.supplierDAO.getByIdDAO(id);
            return supplier;
        } catch (error) {
            throw error;
        }
    }
    async getSuppliers() {
        try {
            const suppliers = await this.supplier.getAllDAO();
            return suppliers;
        } catch (error) {
            throw error;
        }
    }
    async getSupplierByEmail(email) {
        try {
            const supplier = await this.supplierDAO.getByFieldDAO(email);
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async getSupplierByCUIL(cuil){
        try{
            const supplier = await this.supplierDAO.getByFieldDAO(cuil);
            
    
            return supplier[0];
        }catch(error){
            throw error;
        }
    }
    async updateSupplierById(id, data) {
        try {
            const supplier = await this.supplierDAO.updateByIdDAO(data, {_id:id});
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async updateSupplierByCUIL(cuil, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedSupplier = await this.supplierDAO.updateOneDao(data,{cuil: cuil});
            return updatedSupplier
        }catch(error){
            throw error;
        }
    }
    async deleteSupplier(id) {
        try {
            const supplier = await this.supplierDAO.deleteByIdDAO(id);
            return supplier;
        } catch (error) {
            throw error;
        }
    }

    async deleteSupplierByCUIL(cuil){
        try{
            const supplier = await this.supplierDAO.deleteByFieldDAO(cuil);
            return supplier;
        }catch(error){
            throw error;
        }
    }

}
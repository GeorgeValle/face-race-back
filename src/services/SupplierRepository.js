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

    async getSupplierByCUIT(cuit){
        try{
            const supplier = await this.supplierDAO.getByFieldDAO(cuit);
            
    
            return supplier[0];
        }catch(error){
            throw error;
        }
    }

    async getListSupplierByName(name) {
        try {
            const suppliers = await this.supplierDAO.getSuppliersByName(name, 6);
            return suppliers;
        } catch (error) {
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

    async updateSupplierByCUIT(cuit, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedSupplier = await this.supplierDAO.updateOneDao(data,{cuit: cuit});
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

    async deleteSupplierByCUIT(cuit){
        try{
            const supplier = await this.supplierDAO.deleteByFieldDAO(cuit);
            return supplier;
        }catch(error){
            throw error;
        }
    }

}
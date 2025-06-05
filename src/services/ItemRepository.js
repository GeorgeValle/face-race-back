//import SupplierDTO from '../dto/SupplierDTO.js';


export default class ItemRepository {
    constructor(itemDAO) {
        this.itemDAO = itemDAO;

    }
    async createItem(data) {
        try {
            const item = await this.itemDAO.saveDataDAO(data);
            return item;
        } catch (error) {
            throw error;
        }
    }
    async getItemById(id) {
        try {
            const item = await this.itemDAO.getByIdDAO(id);
            return item;
        } catch (error) {
            throw error;
        }
    }
    async getItems() {
        try {
            const items = await this.item.getAllDAO();
            return items;
        } catch (error) {
            throw error;
        }
    }
    async getItemByName(name) {
        try {
            const item = await this.itemDAO.getOneItemByName(name);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async getItemsByCategory(category) {
        try {
            const item = await this.itemDAO.getItemsByCategory(category,10);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async getItemsByReorderPoint(quantity){
        try{
            const items = await this.itemDAO.getByFieldDAO({ stockQuantity: { $lte: quantity } })
            return items;
        }catch(error){
            throw error;
        }
    }

    async getItemByCode(code){
        try{
            const item = await this.itemDAO.getByFieldDAO(code);
            
    
            return item[0];
        }catch(error){
            throw error;
        }
    }
    async updateItemById(id, data) {
        try {
            const item = await this.itemDAO.updateByIdDAO(data, {_id:id});
            return item;
        } catch (error) {
            throw error;
        }
    }

    async updateStockItemByCode(code,data){
        
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedItem = await this.itemDAO.incrementOneFieldDAO({code: code},data);
            return updatedItem
        }catch(error){
            throw error;
        }
    }

    async updateItemByCode(code, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedItem = await this.itemDAO.updateOneDao(data,{code: code});
            return updatedItem
        }catch(error){
            throw error;
        }
    }

    async updateItemByName(name, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedItem = await this.itemDAO.updateOneDao(data,{name: name});
            return updatedItem
        }catch(error){
            throw error;
        }
    }

    async deleteItem(id) {
        try {
            const item = await this.itemDAO.deleteByIdDAO(id);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async deleteItemByCode(code){
        try{
            const item = await this.itemDAO.deleteByFieldDAO(code);
            return item;
        }catch(error){
            throw error;
        }
    }

    async disableItem(code){
        try{
        const item = await this.itemDAO.updateOneDao({active:false},code);
        return item
        }catch(error){
            throw error;
        }
    }

    async enableItem(code){
        try{
            const item = await this.itemDAO.updateOneDao({active:true},{code: code});
            return updatedItem
            }catch(error){
                throw error;
            }
    }

}
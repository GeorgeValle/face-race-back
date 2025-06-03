export default class PurchaseRepository {
    constructor(purchaseDAO) {
        this.purchaseDAO = purchaseDAO;

    }
    async createPurchase(data) {
        try {
            const purchase = await this.purchaseDAO.saveDataDAO(data);
            return purchase;
        } catch (error) {
            throw error;
        }
    }
    async getPurchaseById(id) {
        try {
            const purchase = await this.purchaseDAO.getByIdDAO(id);
            return purchase;
        } catch (error) {
            throw error;
        }
    }
    async getPurchases() {
        try {
            const purchases = await this.purchase.getAllDAO();
            return purchases;
        } catch (error) {
            throw error;
        }
    }
    async getPurchasesByName(name) {
        try {
            const purchases = await this.purchaseDAO.getPurchasesByName(name);
            return purchases;
        } catch (error) {
            throw error;
        }
    }

    

    async getPurchaseByPurchaseNumber(purchaseNumber){
        try{
            const purchase = await this.purchaseDAO.getByFieldDAO({ purchaseNumber:  purchaseNumber  })
            return purchase[0];
        }catch(error){
            throw error;
        }
    }

    async getPurchasesByDate(date){
        try{
            const purchases = await this.purchaseDAO.getByFieldDAO(date);
            
    
            return purchases;
        }catch(error){
            throw error;
        }
    }

    async getPurchasesByMonthAndYear (month, year) {
        try {
            const purchases = await this.purchaseDAO.getPurchasesByMonthAndYear(month, year);
            return purchases;
        } catch (error) {
            throw error;
        }
    }

    async getPurchasesByCuitAndYear (cuit, year) {
        try{
            const purchases = this.purchaseDAO.getPurchasesByCuitAndYear(cuit, year)
            return purchases;
        }catch(error){
            throw error;
        }
    }

    async getTotalPaymentsByTypeAndMonth (type, year){
        try{
            const amountPurchases = await this.purchaseDAO.getTotalPaymentsByTypeAndMonth(type, year)
            return amountPurchases;
        }catch(error){
            throw error;
        }
    }

    async getTotalProductAmountByCodeAndMonth (code, year){
        try{
            const amountPurchases = await this.purchaseDAO.getTotalProductAmountByCodeAndMonth(code, year)
            return amountPurchases;
        }catch(error){
            throw error;
        }
    }

    async getTotalOfPaymentsByYear (year) {
        try{
        const purchases = await this.purchaseDAO.getTotalPaymentsByMonth(year);
        return purchases;
        }catch(error){
            throw error;
        }
    }
    
    async updatePurchaseById(id, data) {
        try {
            const purchase = await this.purchaseDAO.updateByIdDAO(data, {_id:id});
            return purchase;
        } catch (error) {
            throw error;
        }
    }
    //warning look his Mongo class
    async updatePurchaseByPurchaseNumber(purchaseNumber, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedPurchase = await this.purchaseDAO.updateOneDao(data,{purchaseNumber: purchaseNumber});
            return updatedPurchase
        }catch(error){
            throw error;
        }
    }

    /* async updateItemByName(name, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedItem = await this.itemDAO.updateOneDao(data,{name: name});
            return updatedItem
        }catch(error){
            throw error;
        }
    } */

    async deleteSale(id) {
        try {
            const purchase = await this.purchaseDAO.deleteByIdDAO(id);
            return purchase;
        } catch (error) {
            throw error;
        }
    }

    async deleteSaleByPurchaseNumber(purchaseNumber){
        try{
            const purchase = await this.purchaseDAO.deleteByFieldDAO({purchaseNumber: purchaseNumber});
            return purchase;
        }catch(error){
            throw error;
        }
    }

    //look this!!!
    async disableSale(purchaseNumber){
        try{
        const purchase = await this.purchaseDAO.updateOneDao({active:false},purchaseNumber);
        return purchase
        }catch(error){
            throw error;
        }
    }

    async enableSale(purchaseNumber){
        try{
            const updatedPurchase = await this.purchaseDAO.updateOneDao({active:true},{purchaseNumber: purchaseNumber});
            return updatedPurchase
            }catch(error){
                throw error;
            }
    }

}
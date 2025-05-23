//import SaleDTO from '../dto/SaleDTO.js';


export default class SaleRepository {
    constructor(saleDAO) {
        this.saleDAO = saleDAO;

    }
    async createSale(data) {
        try {
            const sale = await this.saleDAO.saveDataDAO(data);
            return sale;
        } catch (error) {
            throw error;
        }
    }
    async getSaleById(id) {
        try {
            const sale = await this.saleDAO.getByIdDAO(id);
            return sale;
        } catch (error) {
            throw error;
        }
    }
    async getSales() {
        try {
            const sales = await this.sale.getAllDAO();
            return sales;
        } catch (error) {
            throw error;
        }
    }
    async getSalesByName(name) {
        try {
            const sales = await this.itemDAO.getOneSalesByName(name);
            return sales;
        } catch (error) {
            throw error;
        }
    }

    

    async getSaleBySaleNumber(saleNumber){
        try{
            const sale = await this.saleDAO.getByFieldDAO({ saleNumber:  saleNumber  })
            return sale[0];
        }catch(error){
            throw error;
        }
    }

    async getSalesByDate(date){
        try{
            const sales = await this.saleDAO.getByFieldDAO(date);
            
    
            return sales;
        }catch(error){
            throw error;
        }
    }

    async getSalesByMonthAndYear (month, year) {
        try {
            const sales = await this.saleDAO.getSalesByMonthAndYear(month, year);
            return sales;
        } catch (error) {
            throw error;
        }
    }

    async getSalesByDniAndYear (dni, year) {
        try{
            const sales = this.saleDAO.getSalesByDniAndYear(dni, year)
            return sales;
        }catch(error){
            throw error;
        }
    }

    async getTotalPaymentsByTypeAndMonth (type, year){
        try{
            const amountSales = await this.saleDAO.getTotalPaymentsByTypeAndMonth(type, year)
            return amountSales;
        }catch(error){
            throw error;
        }
    }

    async getTotalProductAmountByCodeAndMonth (code, year){
        try{
            const amountSales = await this.saleDAO.getTotalProductAmountByCodeAndMonth(code, year)
            return amountSales;
        }catch(error){
            throw error;
        }
    }

    async getTotalOfPaymentsByYear (year) {
        try{
        const sales = await this.saleDAO.getTotalPaymentsByMonth(year);
        return sales;
        }catch(error){
            throw error;
        }
    }
    
    async updateSaleById(id, data) {
        try {
            const sale = await this.saleDAO.updateByIdDAO(data, {_id:id});
            return sale;
        } catch (error) {
            throw error;
        }
    }

    async updateSaleBySaleNumber(saleNumber, data){
        try {
            //const updatedClient = await this.clientDAO.updateByFieldDAO(dni, data);
            const updatedSale = await this.saleDAO.updateOneDao(data,{saleNumber: saleNumber});
            return updatedSale
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
            const sale = await this.saleDAO.deleteByIdDAO(id);
            return sale;
        } catch (error) {
            throw error;
        }
    }

    async deleteSaleBySaleNumber(saleNumber){
        try{
            const sale = await this.saleDAO.deleteByFieldDAO({saleNumber: saleNumber});
            return sale;
        }catch(error){
            throw error;
        }
    }

    //look this!!
    async disableSale(saleNumber){
        try{
        const sale = await this.saleDAO.updateOneDao({active:false},saleNumber);
        return sale
        }catch(error){
            throw error;
        }
    }

    async enableSale(saleNumber){
        try{
            const updatedSale = await this.saleDAO.updateOneDao({active:true},{saleNumber: saleNumber});
            return updatedSale
            }catch(error){
                throw error;
            }
    }

}
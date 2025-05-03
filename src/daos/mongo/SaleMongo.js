import { MongoDAO } from './MongoDAO.js';
import SaleModel from './models/SaleModel.js';


//create the new class Sale
class Sale extends MongoDAO { //extends methods in common
    constructor() {
        super(SaleModel)
    }

    getSalesByMonthAndYear = async (month, year) => {
        try {

            const firstDate = new Date(year, month - 1, 1);
            const lastDate = new Date(year, month, 1);

            let objDAO = await this.collection.find({
                saleDate: {
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



    getTotalPaymentsByMonth = async (year)=> {
        return await this.collection.aggregate([
            {
                $match: {
                    saleDate: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Inicio del año
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // Fin del año
                    }
                }
            },
            { $unwind: "$payment" }, // Descomponer el array de payments
            {
                $group: {
                    _id: { month: { $month: "$saleDate" } }, // Agrupar por mes
                    totalAmount: { $sum: { $toDouble: "$payment.amount" } } // Convertir y sumar montos
                }
            },
            { $sort: { "_id.month": 1 } } // Ordenar por mes
        ]);
    }
}
export default new Sale
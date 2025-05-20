import { MongoDAO } from './MongoDAO.js';
import PurchaseModel from './models/PurchaseModel.js';


//create the new class Purchase
class Purchase extends MongoDAO { //extends methods in common
    constructor() {
        super(PurchaseModel)
    }


    getPurchasesByMonthAndYear = async (month, year) => {
        try {

            const firstDate = new Date(year, month - 1, 1);
            const lastDate = new Date(year, month, 1);

            let objDAO = await this.collection.find({
                purchaseDate: {
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


    getPurchasesByCuitAndYear = async (cuit, year) => {
        return await this.collection.find({
            "supplier.cuit": cuit, // Supplier cuit filter
            purchaseDate: {
                $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Init of year
                $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // End of year
            }
        }).lean(); // return pure js objects
    }


    getTotalPaymentsByMonth = async (year) => {
        return await this.collection.aggregate([
            {
                $match: {
                    purchaseDate: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Init of year
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // End of year
                    }
                }
            },
            { $unwind: "$payment" }, // breakdown the array of payments
            {
                $group: {
                    _id: { month: { $month: "$purchaseDate" } }, // Group by month
                    totalAmount: { $sum: { $toDouble: "$payment.amount" } } // convert and add amounts
                }
            },
            { $sort: { "_id.month": 1 } } // Order by month
        ]);
    }

    async getTotalPaymentsByTypeAndMonth(type, year) {
        return await this.collection.aggregate([
            {
                $match: {
                    purchaseDate: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Init of year
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // End of year
                    }
                }
            },
            { $unwind: "$payment" }, // breakdown the array of payments on each sale
            { $match: { "payment.type": type } }, // filter by  type payment
            {
                $group: {
                    _id: { month: { $month: "$purchaseDate" } }, // group by month
                    totalAmount: { $sum: { $toDouble: "$payment.amount" } } // add all amount of specific type
                }
            },
            { $sort: { "_id.month": 1 } } // order by month
        ]);
    }

    async getTotalProductAmountByCodeAndMonth(code, year) {
        return await this.collection.aggregate([
            {
                $match: {
                    purchaseDate: {
                        $gte: new Date(`${year}-01-01T00:00:00.000Z`), // Int of year
                        $lte: new Date(`${year}-12-31T23:59:59.999Z`)  // end of year
                    }
                }
            },
            { $unwind: "$itemList" }, // breakdown the array of item i each sale
            { $match: { "itemList.code": code } }, // filtered item by code
            {
                $group: {
                    _id: { month: { $month: "$purchaseDate" } }, // group by month 
                    totalAmount: { $sum: { $toDouble: "$itemList.amount" } } // add amount of all items filtered
                }
            },
            { $sort: { "_id.month": 1 } } // order by month
        ]);
    }



}
export default new Purchase
import { Router } from "express";
import {registerSale,
    findSaleBySaleNumber,
    findSalesByName,
    findSalesByDate,
    findSaleById, 
    editSaleBySaleNumber,
    editSaleById,
    deleteSale,
    //deleteSaleBySaleNumber,
    enableSaleBySaleNumber,
    disableSaleBySaleNumber,
    findSalesByMonthAndYear,
    findTotalPaymentsByYear,
    findSalesByDniAndYear,
    findTotalPaymentsByTypeAndMonth,
    findTotalProductAmountByCodeAndMonth,
    editDescriptionBySaleNumber,
    editPaidStateBySaleNumber
} from '../controllers/SaleController.js';

const router = Router();

router.post("/register", registerSale);

router.get("/name/:name", findSalesByName);

router.get("/number/:saleNumber", findSaleBySaleNumber);

router.get("/year/:year",findTotalPaymentsByYear);

router.get("/date/:dateInit/:dateEnd",findSalesByDate);

router.get("/month/:month/year/:year", findSalesByMonthAndYear);

router.get("/payments/:type/:year", findTotalPaymentsByTypeAndMonth)

router.get("/item/:code/:year", findTotalProductAmountByCodeAndMonth)

router.get("/client/:dni/:year", findSalesByDniAndYear);

router.get("/id/:id", findSaleById);

router.put("/id/:id", editSaleById);

router.put("/paid/:saleNumber",editPaidStateBySaleNumber);

router.put ("/description/:saleNumber",editDescriptionBySaleNumber);

router.put("/number/:saleNumber", editSaleBySaleNumber);

router.delete("/delete/:id",deleteSale);

router.put("/disable/:saleNumber",disableSaleBySaleNumber);

router.put("/enable/:saleNumber",enableSaleBySaleNumber);


export default router
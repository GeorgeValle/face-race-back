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
    disableSaleBySaleNumber
    
} from '../controllers/SaleController.js';

const router = Router();

router.post('/register', registerSale);

router.get("/name/:name", findSalesByName);

router.get("/number/:saleNumber", findSaleBySaleNumber);

router.get("/date/:dateInit/:dateEnd",findSalesByDate);

router.get("/id/:id", findSaleById);

router.put("/id/:id", editSaleById);

router.put("/number/:saleNumber", editSaleBySaleNumber);

router.delete("/delete/:id",deleteSale);

router.put("/disable/:saleNumber",disableSaleBySaleNumber);

router.put("/enable/:saleNumber",enableSaleBySaleNumber);


export default router
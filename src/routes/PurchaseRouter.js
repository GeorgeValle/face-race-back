import { Router } from "express";
import {registerPurchase,
    findPurchaseByPurchaseNumber,
    findPurchasesByName,
    findPurchasesByDate,
    findPurchaseById, 
    editPurchaseByPurchaseNumber,
    editPurchaseById,
    deletePurchase,
    
    enablePurchaseByPurchaseNumber,
    disablePurchaseByPurchaseNumber,
    findPurchasesByMonthAndYear,
    findTotalPaymentsByYear,
    findPurchasesByCuitAndYear,
    findTotalPaymentsByTypeAndMonth,
    findTotalProductAmountByCodeAndMonth,
    editDescriptionByPurchaseNumber,
    editPaidStateByPurchaseNumber,
    editStatusByPurchaseNumber
} from '../controllers/PurchaseController.js';

const router = Router();

router.post("/register", registerPurchase);

router.get("/name/:name", findPurchasesByName);

router.get("/number/:purchaseNumber", findPurchaseByPurchaseNumber);

router.get("/year/:year",findTotalPaymentsByYear);

router.get("/date/:dateInit/:dateEnd",findPurchasesByDate);

router.get("/month/:month/year/:year", findPurchasesByMonthAndYear);

router.get("/payments/:type/:year", findTotalPaymentsByTypeAndMonth)

router.get("/item/:code/:year", findTotalProductAmountByCodeAndMonth)

router.get("/supplier/:cuit/:year", findPurchasesByCuitAndYear);

router.get("/id/:id", findPurchaseById);

router.put("/id/:id", editPurchaseById);

router.put("/paid/:purchaseNumber",editPaidStateByPurchaseNumber);

router.put("/status/:status",editStatusByPurchaseNumber),

router.put ("/description/:purchaseNumber",editDescriptionByPurchaseNumber);

router.put("/number/:purchaseNumber", editPurchaseByPurchaseNumber);

router.delete("/delete/:id",deletePurchase);

router.put("/disable/:purchaseNumber",disablePurchaseByPurchaseNumber);

router.put("/enable/:purchaseNumber",enablePurchaseByPurchaseNumber);


export default router
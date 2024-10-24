import { Router } from "express";
import {registerSupplier,
    findSupplierByCUIL,
    findSupplierById, 
    editSupplierByCUIL, 
    editSupplierById, 
    deleteSupplier,
    deleteSupplierByCUIL
} from '../controllers/SupplierController.js';

const router = Router();

router.post('/register', registerSupplier);

router.get("/cuil/:cuil", findSupplierByCUIL);

router.get("/id/:id", findSupplierById);

router.put("/id/:id", editSupplierById);

router.put("/cuil/:cuil", editSupplierByCUIL);

router.delete("/delete/:id",deleteSupplier);

router.delete("/cuil/:cuil",deleteSupplierByCUIL);

export default router
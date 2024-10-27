import { Router } from "express";
import {registerSupplier,
    findSupplierByCUIT,
    findSupplierById, 
    editSupplierByCUIT, 
    editSupplierById, 
    deleteSupplier,
    deleteSupplierByCUIT
} from '../controllers/SupplierController.js';

const router = Router();

router.post('/register', registerSupplier);

router.get("/cuit/:cuit", findSupplierByCUIT);

router.get("/id/:id", findSupplierById);

router.put("/id/:id", editSupplierById);

router.put("/cuit/:cuit", editSupplierByCUIT);

router.delete("/delete/:id",deleteSupplier);

router.delete("/cuit/:cuit",deleteSupplierByCUIT);

export default router
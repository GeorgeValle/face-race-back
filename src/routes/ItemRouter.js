import { Router } from "express";
import {registerItem,
    findItemByCode,
    findItemByName,
    findItemsByCategory,
    findItemById, 
    editItemByCode,
    editItemQuantityByCode, 
    editItemById,
    editItemByName,
    deleteItem,
    deleteItemByCode,
    reorderPointList
} from '../controllers/ItemController.js';

const router = Router();

router.post('/register', registerItem);

router.get("/name/:name", findItemByName);

router.get("/code/:code", findItemByCode);

router.get("/category/:category",findItemsByCategory);

router.get("/id/:id", findItemById);

router.put("/id/:id", editItemById);

router.put("/code/:code", editItemByCode);

router.put("/stock/:code", editItemQuantityByCode);

router.put("/name/:name", editItemByName);

router.delete("/delete/:id",deleteItem);

router.delete("/code/:code",deleteItemByCode);

router.get("/reorder", reorderPointList);

export default router
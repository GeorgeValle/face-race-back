import { Router } from "express";
import {registerClient,
    findClientByDNI,
    findClientById, 
    editClientByDNI, 
    editClientById, 
    deleteClient,
    deleteClientByDNI,
    findClientByName
} from '../controllers/ClientController.js';

const router = Router();

router.post('/register', registerClient);

router.get("/dni/:dni", findClientByDNI);

router.get("/name/:name", findClientByName);

router.get("/id/:id", findClientById);

router.put("/id/:id", editClientById);

router.put("/dni/:dni", editClientByDNI);

router.delete("/delete/:id",deleteClient);

router.delete("/dni/:dni",deleteClientByDNI);

export default router;
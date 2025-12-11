import { Router } from "express";
import {registerReconditioning,
    findReconditioningsByShiftDate,
    findReconditioningById, 
    findReconditioningByShiftDate,
    findReconditioningsByMonthAndYear, 
    findReconditioningByDNI,
    findReconditioningsByDNI,
    findOneReconditioningByDateAndTime,
    editReconditioningById,
    deleteReconditioning,
    

} from '../controllers/ReconditioningController.js';

const router = Router();

router.post('/register', registerReconditioning);

router.get("/manyByDate/:shiftDate", findReconditioningsByShiftDate);

router.get("/shiftDate/:shiftDate", findReconditioningByShiftDate);

router.get("/date/:month/:year", findReconditioningsByMonthAndYear)

router.get("/dni/:dni",findReconditioningByDNI)

router.get("/many/:dni", findReconditioningsByDNI)

router.get("/day/:shiftDate/time/:timeSlot",findOneReconditioningByDateAndTime )

router.get("/id/:id", findReconditioningById);

router.put("/id/:id", editReconditioningById);



router.delete("/delete/:id",deleteReconditioning);





export default router;
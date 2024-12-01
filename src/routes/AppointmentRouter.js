import { Router } from "express";
import {registerAppointment,
    findAppointmentsByShiftDate,
    findAppointmentById, 
    findAppointmentByShiftDate,
    findAppointmentsByMonthAndYear, 
    findOneAppointmentByIdClient, 
    editAppointmentById,
    deleteAppointment,
    deleteOneAppointmentByIdClient

} from '../controllers/AppointmentController.js';

const router = Router();

router.post('/register', registerAppointment);

router.get("/manyByDate/:shiftDate", findAppointmentsByShiftDate);

router.get("/shiftDate/:shiftDate", findAppointmentByShiftDate);

router.get("/date/:month/:year", findAppointmentsByMonthAndYear)

router.get("/client/:id", findOneAppointmentByIdClient);

router.get("/id/:id", findAppointmentById);

router.put("/id/:id", editAppointmentById);

router.delete("/delete/:id",deleteAppointment);

router.delete("/client/:id",deleteOneAppointmentByIdClient);

export default router;
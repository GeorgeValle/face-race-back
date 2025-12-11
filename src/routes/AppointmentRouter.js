import { Router } from "express";
import {
    registerAppointment,
    findAppointmentsByShiftDate,
    findAppointmentById, 
    findAppointmentByShiftDate,
    findAppointmentsByMonthAndYear, 
    findAppointmentByDNI,
    findAppointmentsByDNI,
    findOneAppointmentByDateAndTime,
    editAppointmentById,
    deleteAppointment,
} from '../controllers/AppointmentController.js';

const router = Router();

router.post('/register', registerAppointment);

router.get("/manyByDate/:shiftDate", findAppointmentsByShiftDate);

router.get("/shiftDate/:shiftDate", findAppointmentByShiftDate);

router.get("/day/:shiftDate/time/:timeSlot", findOneAppointmentByDateAndTime);

router.get("/date/:month/:year", findAppointmentsByMonthAndYear);

router.get("/dni/:dni",findAppointmentByDNI);

router.get("/many/:dni",findAppointmentsByDNI);

router.get("/id/:id", findAppointmentById);

router.put("/id/:id", editAppointmentById);

router.delete("/delete/:id",deleteAppointment);


export default router;
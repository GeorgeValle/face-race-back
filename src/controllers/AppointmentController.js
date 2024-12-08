import { appointmentRepository, clientRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'

//import ClientDTO from '../dto/ClientDTO.js'

export const registerAppointment = async (req, res) => {
    logInfo.info('init shift create')
    if (!req.body){res.status(400).json({ registered:false, message: "faltan los datos" })}
    const { person, phone, email, dni, shiftDate, timeSlot } = req.body
    logInfo.info(`payload: ${person}, ${shiftDate}, ${phone}, ${email}, ${dni}, ${timeSlot}`)
    
    try {
        // validate unique appointment
        const existingAppointment = await appointmentRepository.getAppointmentsByDateAndTime(shiftDate,timeSlot)
        if(existingAppointment.length>0){res.status(409).json({ registered:false, message: "Ya hay un turno en el mismo horario" })}
        const appointment = await appointmentRepository.createAppointment({person:person, phone:phone, email:email, dni:dni, shiftDate:shiftDate, timeSlot:timeSlot})
        logInfo.info(`Appointment created:`)
        logInfo.info(appointment)
        const sentAppointment ={
            _id:appointment._id,
            person:appointment.person,
            dni:appointment.dni,
            email:appointment.email,
            phone:appointment.phone,
            shiftDate:appointment.shiftDate,
            timeSlot:appointment.timeSlot
        }
        if (!appointment){res.status(409).json({ registered:false, message: "No se ha agregado el turno" })}
        return res.status(201).json({data:sentAppointment, registered:true, message:`Se ha registrado el turno`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findAppointmentsByShiftDate = async (req, res) => {
    try {
        const appointment = await appointmentRepository.getAppointmentsByShiftDate( req.params.shiftDate)
        logInfo.info("Appointment found By shiftDate")
        logInfo.info(appointment)

        return res.status(200).send({data:appointment})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findAppointmentById = async (req, res) => {
    try {
        
        const appointment = await appointmentRepository.getAppointmentById(req.params.id)

        
        return res.status(200).send({ data: appointment })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findAppointmentByDNI = async (req, res) => {
    logInfo.info("find by dni")
    logInfo.info(req.params.dni)
    try {
        const appointment = await appointmentRepository.getAppointmentByDNI({dni: parseInt(req.params.dni)})
        logInfo.info("Appointment found By dni")
        logInfo.info(appointment)

        return res.status(200).send({data:appointment})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findAppointmentByShiftDate = async (req, res) => {
    try {
        const appointment = await appointmentRepository.getOneAppointmentByShiftDate(req.params.shiftDate)

        
        return res.status(200).send({ data: appointment })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findAppointmentsByMonthAndYear = async (req, res) => {
    logInfo.info("find many M and Y")
    logInfo.info(req.params.month, "- y - ",req.params.year)
    try {
        const appointments = await appointmentRepository.getAppointmentsByMonthAndYear(req.params.month,req.params.year)

    if (Array.isArray(appointments)) {
        const formattedAppointments = appointments.reduce((acc, appointment) => {
            const key = `${new Date(appointment.shiftDate).toISOString().split('T')[0]}-${appointment.timeSlot}`;
            acc[key] = {
                _id: appointment._id, 
                person: appointment.person, 
                dni: appointment.dni, 
                email: appointment.email, 
                phone: appointment.phone, 
                shiftDate: appointment.shiftDate, 
                timeSlot: appointment.timeSlot 
            };
            return acc;
        }, {});
        logInfo.info(formattedAppointments)
        return res.status(200).send({data:Object.values(formattedAppointments)})
    }else{
        throw new Error("Is not Array")
    }
        
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const editAppointmentById = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({message:"Faltan los datos"})
        const appointment = await appointmentRepository.updateAppointmentById(req.params.id,req.body)
        if (!appointment) return  res.status(400).json({message:"No se actualizó"})
            logInfo.info("Appointment actualizado por Id")
        return res.status(200).json({ message: `Se ha actualizado el turno` })
    } catch (error) {
        logInfo.info("error editar por Id")
        res.status(500).json({ message: error })
    }
}

export const editAppointmentByDNI = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({message:"Faltan los datos"})
        const appointment = await appointmentRepository.updateAppointmentByDNI(req.params.dni,req.body)
        if (!appointment) return  res.status(400).json({message:"No se actualizó"})
            logInfo.info("Appointment actualizado por Id")
        return res.status(200).json({ message: `Se ha actualizado el turno` })
    } catch (error) {
        logInfo.info("error editar al editar por DNI")
        res.status(500).json({ message: error })
    }
}


export const deleteAppointment = async (req, res) => {
    logInfo.info("init delete by id")

    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const appointment = await appointmentRepository.deleteAppointment(id)
        logInfo.info(`deleted appointment = ${appointment}`)
        if (!appointment) return res.status(404).json({ deleted:false, message: ' NO se eliminó ningún turno' });
        res.status(200).send({ deleted:true, message: `el turno fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: "Error al Eliminar el turno" })
        logInfo.info(error)
    }
}

export const deleteAppointmentByDNI = async (req, res) => {
    try {
        const dni  = req.params.dni;
        if (!dni) return res.status(400).json({ message: "Falta el DNI" });
        const appointment = await clientRepository.deleteAppointment(dni)
        if (!appointment) return res.status(404).json({ message: '"NO" existe el turno' });
        res.status(200).send({ message: `el turno fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

import { appointmentRepository, clientRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerAppointment = async (req, res) => {
    if (!req.body){res.status(500).json({ message: "faltan los datos" })}
    try {
        const appointment = await appointmentRepository.createAppointment(req.body)
        logInfo(`Appointment created:`)
        return res.status(201).json({
            Message:
                `Se ha registrado el turno`
        })
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
        const oneAppointment = await appointmentRepository.getAppointmentById(req.params.id)

        const appointment = await oneAppointment.populate('client').execPopulate();
        return res.status(200).send({ data: appointment })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findAppointmentByShiftDate = async (req, res) => {
    try {
        const oneAppointment = await appointmentRepository.getOneAppointmentByShiftDate(req.params.shiftDate)

        const appointment = await oneAppointment.populate('client').execPopulate();
        return res.status(200).send({ data: appointment })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findOneAppointmentByIdClient = async (req, res) => {
    try {
        const appointment = await appointmentRepository.getOneAppointmentByIdClient({client:req.params.id})
        return res.status(200).send({ data: appointment })
    } catch (error) {
        res.status(404).json({ message: error })
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


export const deleteAppointment = async (req, res) => {
    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const appointment = await clientRepository.deleteAppointment(id)
        if (!appointment) return res.status(404).json({ message: '"NO" existe el turno' });
        res.status(200).send({ message: `el turno fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteOneAppointmentByIdClient = async (req, res) => {
    const  idClient  = parseInt(req.params.idClient);
    if (!idClient) return res.status(400).json({ message: "Falta el id "})
    try {
            const appointmentDeleted = await appointmentRepository.deleteAppointmentByIdClient({client:idClient})
        
            res.status(200).send({ message: `el turno fue eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
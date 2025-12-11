import { reconditioningRepository, clientRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'

//import ClientDTO from '../dto/ClientDTO.js'

export const registerReconditioning = async (req, res) => {
    logInfo.info('init shift create')
    if (!req.body){res.status(400).json({ registered:false, message: "faltan los datos" })}
    const { person, phone, email, dni, shiftDate, timeSlot } = req.body
    logInfo.info(`payload: ${person}, ${shiftDate}, ${phone}, ${email}, ${dni}, ${timeSlot}`)
    
    try {
        // validate unique appointment
        const existingReconditioning = await reconditioningRepository.getReconditioningsByDateAndTime(shiftDate,timeSlot)
        if(existingReconditioning.length>0){res.status(409).json({ registered:false, message: "Ya hay un turno en el mismo horario" })}
        const reconditioning = await reconditioningRepository.createReconditioning({person:person, phone:phone, email:email, dni:dni, shiftDate:shiftDate, timeSlot:timeSlot})
        logInfo.info(`Reconditioning created:`)
        logInfo.info(reconditioning)
        const sentReconditioning ={
            _id:reconditioning._id,
            person:reconditioning.person,
            dni:reconditioning.dni,
            email:reconditioning.email,
            phone:reconditioning.phone,
            shiftDate:reconditioning.shiftDate,
            timeSlot:reconditioning.timeSlot
        }
        if (!reconditioning){res.status(409).json({ registered:false, message: "No se ha agregado el turno" })}
        return res.status(201).json({data:sentReconditioning, registered:true, message:`Se ha registrado el turno`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findReconditioningsByShiftDate = async (req, res) => {
    try {
        const reconditioning = await reconditioningRepository.getReconditioningsByShiftDate( req.params.shiftDate)
        logInfo.info("Reconditioning found By shiftDate")
        logInfo.info(reconditioning)

        return res.status(200).send({data:reconditioning})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findReconditioningById = async (req, res) => {
    try {
        
        const reconditioning = await reconditioningRepository.getReconditioningById(req.params.id)

        
        return res.status(200).send({ data: reconditioning })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findOneReconditioningByDateAndTime = async (req, res) =>{
    const shiftDate = req.params.shiftDate;
    const timeSlot = req.params.timeSlot;
    logInfo.info(shiftDate)
    logInfo.info(timeSlot)
    try{
            const reconditioning = await reconditioningRepository.getOneReconditioningByDateAndTime(shiftDate, timeSlot)
            logInfo.info("Reconditioning found By ShiftDate and timeSlot")
            logInfo.info(reconditioning)
    
            return res.status(200).send({data:reconditioning})
        }catch(error){
            res.status(500).json({ message: error })
        }
}

export const findReconditioningByDNI = async (req, res) => {
    logInfo.info("find by dni")
    logInfo.info(req.params.dni)
    try {
        const reconditioning = await reconditioningRepository.getReconditioningByDNI({dni: parseInt(req.params.dni)})
        logInfo.info("Reconditioning found By dni")
        logInfo.info(reconditioning)

        return res.status(200).send({data:reconditioning})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findReconditioningsByDNI = async (req, res) => {
    logInfo.info("find by dni")
    logInfo.info(req.params.dni)
    try {
        const reconditionings = await reconditioningRepository.getReconditioningsByDNI({dni: parseInt(req.params.dni)})
        logInfo.info("Reconditionings found By dni")
        logInfo.info(reconditionings)

        return res.status(200).send({data:reconditionings})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findReconditioningByShiftDate = async (req, res) => {
    try {
        const reconditioning = await reconditioningRepository.getOneReconditioningByShiftDate(req.params.shiftDate)

        
        return res.status(200).send({ data: reconditioning })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findReconditioningsByMonthAndYear = async (req, res) => {

    const month = req.params.month;
    const year = req.params.year;

    logInfo.info("find many M and Y")
    logInfo.info(month, "- y - ", year)

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    try {
        if (year == currentYear && month <= currentMonth) {
            
            const updated = await reconditioningRepository.updateReconditioningStatusByDate()
            logInfo.info("updated status: ",updated)
        }

        const reconditionings = await reconditioningRepository.getReconditioningsByMonthAndYear(month, year)

    if (Array.isArray(reconditionings)) {
        const formattedReconditionings = reconditionings.reduce((acc, reconditioning) => {
            const key = `${new Date(reconditioning.shiftDate).toISOString().split('T')[0]}-${reconditioning.timeSlot}`;
            acc[key] = {
                _id: reconditioning._id, 
                person: reconditioning.person, 
                dni: reconditioning.dni, 
                email: reconditioning.email, 
                phone: reconditioning.phone, 
                shiftDate: reconditioning.shiftDate, 
                timeSlot: reconditioning.timeSlot,
                status: reconditioning.status,
                description: reconditioning.description
            };
            return acc;
        }, {});
        logInfo.info("Reconditionings list: ",formattedReconditionings)
        return res.status(200).send({data:Object.values(formattedReconditionings)})
    }else{
        throw new Error("Is not Array")
    }
        
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


export const editReconditioningById = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({message:"Faltan los datos"})
        const reconditioning = await reconditioningRepository.updateReconditioningById(req.params.id,req.body)
        if (!reconditioning) return  res.status(400).json({message:"No se actualizó"})
            logInfo.info("Reconditioning actualizado por Id")
        return res.status(200).json({ message: `Se ha actualizado el turno` })
    } catch (error) {
        logInfo.info("error editar por Id")
        res.status(500).json({ message: error })
    }
}

export const editReconditioningByDNI = async (req, res) => {
    try {
        const data = req.body;
        if (!data) return res.status(400).json({message:"Faltan los datos"})
        const reconditioning = await reconditioningRepository.updateReconditioningByDNI(req.params.dni,req.body)
        if (!reconditioning) return  res.status(400).json({message:"No se actualizó"})
            logInfo.info("Rectificación actualizada por Id")
        return res.status(200).json({ message: `Se ha actualizado la rectificación` })
    } catch (error) {
        logInfo.info("error editar al editar por DNI")
        res.status(500).json({ message: error })
    }
}


export const deleteReconditioning = async (req, res) => {
    logInfo.info("init delete by id")

    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const reconditioning = await reconditioningRepository.deleteReconditioning(id)
        logInfo.info(`deleted reconditioning = ${reconditioning}`)
        if (!reconditioning) return res.status(404).json({ deleted:false, message: ' NO se eliminó ningún turno' });
        res.status(200).send({ deleted:true, message: `la rectificación fue eliminada correctamente` })
    } catch (error) {
        res.status(500).json({ message: "Error al Eliminar La rectificación" })
        logInfo.info(error)
    }
}

export const deleteReconditioningByDNI = async (req, res) => {
    try {
        const dni  = req.params.dni;
        if (!dni) return res.status(400).json({ message: "Falta el DNI" });
        const reconditioning = await clientRepository.deleteReconditioning(dni)
        if (!reconditioning) return res.status(404).json({ message: '"NO" existe La rectificación' });
        res.status(200).send({ message: `la rectificación fue eliminada correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

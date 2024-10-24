import { clientRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerClient = async (req, res) => {
    try {
        const client = await clientRepository.createClient(req.body)
        logInfo(`Client created:`)
        return res.status(201).json({
            Message:
                `Se ha registrado al cliente ${client.name} ${client.surname}`
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findClientByDNI = async (req, res) => {
    try {
        const client = await clientRepository.getClientByDNI({ dni: parseInt(req.params.dni) })
        logInfo.info("Client encontrado por dni")
        logInfo.info(client)

        return res.status(200).send({client:client})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findClientById = async (req, res) => {
    try {
        const client = await clientRepository.getClientById(req.params.id)
        return res.status(200).send({ data: client })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const editClientById = async (req, res) => {
    try {
        const data = req.body;
        const client = await clientRepository.updateClientById(req.params.id,req.body)
        if (!client) return  res.status(400).json({mesage:"no se actualizó"})
        return res.status(200).json({ message: `Se ha actualizado el cliente ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editClientByDNI = async (req, res) => {
    const dni = req.params.dni;
    if(!dni) return res.status(400).send({message:"Falta el DNI"})
    const body = req.body;
    
    const data = {
        email:body.email,
        dni:body.dni,//parseInt(body.dni),
        name:body.name,
        surname:body.surname,
        address:body.address,
        city:body.city,
        province:body.province,
        postalCode:body.postalCode,//parseInt(body.postalCode),
        phone:body.phone,//parseInt(body.postalCode),
        cel:body.cel,
        description:body.description
    }
    try {
        const client = await clientRepository.updateClientByDNI(dni, data)
        if (!client){return  res.status(400).send({message:"NO existe cliente"})}
            logInfo.info("Client actualizado por dni")
        return  res.status(200).send({mesage:"Cliente actualizado"})
    } catch (error) {
        logInfo.info("error por dni")
        return res.status(500).send({ message: error })
    }
}

export const deleteClient = async (req, res) => {
    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const client = await clientRepository.deleteClient(id)
        if (!client) return res.status(404).json({ message: '"NO" existe el cliente' });
        res.status(200).send({ message: `el cliente fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteClientByDNI = async (req, res) => {
    const  dni  = parseInt(req.params.dni);
    if (!dni) return res.status(400).json({ message: "Falta el DNI"})
    try {
            const clientDeleted = await clientRepository.deleteClientByDNI({dni:dni})
        // if (!clientDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `el cliente fue eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
import { clientRepository } from "../services/IndexRepository.js"


export const registerClient = async (req, res) => {
    try {
        const client = await clientRepository.createClient(req.body)
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
        return res.status(200).json({ client: client })
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
        if (!client) res.status(400).json({mesage:"no se actualizó"})
        return res.status(200).json({ message: `Se ha actualizado el cliente ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editClientByDNI = async (req, res) => {
    const dni = req.params.dni;
    if(!dni) res.status(400).send({message:"Falta el DNI"})
    const data = req.body;
    if(!data) res.status(400).send({message:"Falta completar datos"})
    try {
        const client = await clientRepository.updateClientByDNI(dni, data)
        if (!client) res.status(400).send({message:"NO existe cliente"})
        res.status(200).send({mesage:"Cliente actualizado"})
    } catch (error) {
        res.status(500).json({ message: error })
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
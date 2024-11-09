import { supplierRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerSupplier = async (req, res) => {
    logInfo.info(`${req.body.cuit} `)
    try {
        const supplier = await supplierRepository.createSupplier(req.body)
        logInfo.info(`Supplier created:`)
        return res.status(201).json({
            message:
                `Se ha registrado al proveedor: ${supplier.companyName},
                alias: ${supplier.businessName} `
        })
    } catch (error) {
        errorLogger.error(error)
        res.status(500).json({ message: "Error al registrar proveedor" })
    }
}

export const findSupplierByCUIT = async (req, res) => {
    try {
        const supplier = await supplierRepository.getSupplierByCUIT({ cuit: parseInt(req.params.cuit) })
        logInfo.info("Supplier encontrado por CUIT")
        logInfo.info(supplier)

        return res.status(200).send({supplier:supplier})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findSupplierById = async (req, res) => {
    try {
        const supplier = await supplierRepository.getSupplierById(req.params.id)
        return res.status(200).send({ data: supplier })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findListSuppliersByName = async (req, res) => {
    try {
        const suppliersList = await supplierRepository.getListSupplierByName(req.params.businessName)
        return res.status(200).send( suppliersList)
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const editSupplierById = async (req, res) => {
    try {
        //const data = req.body;
        const supplier = await supplierRepository.updateSupplierById(req.params.id,req.body);
        if (!supplier) return  res.status(400).json({message:"No se actualizó proveedor"});
        return res.status(200).json({ message: `Se ha actualizado el Proveedor ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editSupplierByCUIT = async (req, res) => {
    const cuit = parseInt(req.params.cuit);
    logInfo.info(cuit)
    if(!cuit) return res.status(400).send({message:"Falta el CUIT"})
    const data = req.body;
    
    // const data = {
    //     email:body.email,
    //     cuit:body.cuit,//parseInt(body.cuil),
    //     businessName:body.businessName,
    //     companyName:body.companyName,
    //     coreBusiness:body.coreBusiness,
    //     address:body.address,
    //     city:body.city,
    //     province:body.province,
    //     postalCode:body.postalCode,//parseInt(body.postalCode),
    //     phone:body.phone,//parseInt(body.postalCode),
    //     cel:body.cel,
    //     description:body.description
    // }
try {
        const supplier = await supplierRepository.updateSupplierByCUIT(cuit, data)
        if (!supplier){return  res.status(400).send({message:"NO existe el Proveedor"})}
            logInfo.info("Proveedor actualizado por CUIT/DNI")
        return  res.status(200).send({message:"Proveedor actualizado"})
    } catch (error) {
        logInfo.info("error por cuit")
        return res.status(500).send({ message: error })
    }
}

export const deleteSupplier = async (req, res) => {
    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const supplier = await supplierRepository.deleteSupplier(id)
        if (!supplier) return res.status(404).json({ message: '"NO" existe el proveedor' });
        res.status(200).send({ message: `El proveedor fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteSupplierByCUIT = async (req, res) => {
    const  cuit  = parseInt(req.params.cuit);
    if (!cuit) return res.status(400).json({ message: "Falta el CUIT"})
    try {
            const supplierDeleted = await supplierRepository.deleteSupplierByCUIT({cuit:cuit})
        // if (!supplierDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `el Proveedor fue eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
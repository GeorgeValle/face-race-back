import { supplierRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerSupplier = async (req, res) => {
    try {
        const supplier = await supplierRepository.createSupplier(req.body)
        logInfo(`Supplier created:`)
        return res.status(201).json({
            Message:
                `Se ha registrado al proveedor ${supplier.companyName} alias ${supplier.businessName} `
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findSupplierByCUIL = async (req, res) => {
    try {
        const supplier = await supplierRepository.getSupplierByCUIL({ cuil: parseInt(req.params.cuil) })
        logInfo.info("Supplier encontrado por CUIL")
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

export const editSupplierByCUIL = async (req, res) => {
    const cuil = req.params.dni;
    if(!cuil) return res.status(400).send({message:"Falta el CUIL"})
    const body = req.body;
    
    const data = {
        email:body.email,
        cuil:body.cuil,//parseInt(body.cuil),
        businessName:body.businessName,
        companyName:body.companyName,
        coreBusiness:body.coreBusiness,
        address:body.address,
        city:body.city,
        province:body.province,
        postalCode:body.postalCode,//parseInt(body.postalCode),
        phone:body.phone,//parseInt(body.postalCode),
        cel:body.cel,
        description:body.description
    }
try {
        const supplier = await supplierRepository.updateSupplierByCUIL(CUIL, CUIL)
        if (!supplier){return  res.status(400).send({message:"NO existe cliente"})}
            logInfo.info("Supplier actualizado por dni")
        return  res.status(200).send({message:"Suppliere actualizado"})
    } catch (error) {
        logInfo.info("error por dni")
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

export const deleteSupplierByCUIL = async (req, res) => {
    const  cuil  = parseInt(req.params.cuil);
    if (!cuil) return res.status(400).json({ message: "Falta el CUIL"})
    try {
            const supplierDeleted = await supplierRepository.deleteSupplierByCUIL({cuil:cuil})
        // if (!supplierDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `el Proveedor fue eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
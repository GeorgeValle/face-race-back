import { itemRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerItem = async (req, res) => {
    logInfo.info(`${req.body.code} `)
    try {
        const item = await itemRepository.createItem(req.body)
        logInfo.info(`Item created:`)
        return res.status(201).json({
            message:
                `Se ha registrado el artículo ${item.name} marca: ${item.brand} `
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findItemByCode = async (req, res) => {
    try {
        const item = await itemRepository.getItemByCode({ code: parseInt(req.params.code) })
        if (item.active==false) { throw new Error("el item está inactivo");}
         //res.status(404).send({message:})}
        logInfo.info("Artículo encontrado por código")
        logInfo.info(item)

        return res.status(200).send({item:item})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}
// search items by name
export const findItemByName = async (req, res) => {
    try {
        const item = await itemRepository.getItemByName(req.params.name )
        if (item.active==false) { throw new Error("el item está inactivo");}
        logInfo.info("Artículo encontrado por nombre")
        logInfo.info(item)

        return res.status(200).send({item:item})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findItemsByCategory = async (req, res) => {
    try {
        const items = await itemRepository.getItemsByCategory(req.params.category )
        logInfo.info("Artículos encontrados por Categoría")
        logInfo.info(items)

        return res.status(200).send(items)
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const reorderPointList = async(req, res) =>{
    try {
        const items = await itemRepository.getItemsByReorderPoint( 3 )
        logInfo.info("Artículos en punto para re ordenar")
        logInfo.info(items)

        return res.status(200).send(items)
    }catch(error){
        res.status(500).json({message:error})
    }
    
}

export const findItemById = async (req, res) => {
    try {
        const item = await itemRepository.getItemById(req.params.id)
        return res.status(200).send({ data: item })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}



export const editItemById = async (req, res) => {
    try {
        //const data = req.body;
        const item = await itemRepository.updateItemById(req.params.id, req.body);
        if (!item) return  res.status(400).json({message:"No se actualizó Artículo"});
        return res.status(200).json({ message: `Se ha actualizado el Artículo ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editItemByCode = async (req, res) => {

    const code = parseInt(req.params.code);
    if(!code) return res.status(400).send({message:"Falta el código"})
    const body = req.body;
    
    const data = {
        code:parseInt(body.code),
        name:body.name,
        stockQuantity:parseInt(body.stockQuantity),
        price:parseFloat(body.price),
        category:body.category,
        brand:body.brand,
        model:body.model,
        origin:body.origin,
        warehouseLocation:body.warehouseLocation,
        description:body.description
    }
try {
        const item = await itemRepository.updateItemByCode(code, data)
        logInfo.info("update item")
        if (!item){return  res.status(400).send({message:"NO existe el Artículo"})}
            logInfo.info("item updated for code")
        return  res.status(200).send({message:"Artículo actualizado"})
    } catch (error) {
        logInfo.info("error to update for code")
        return res.status(500).send({ message: error })
    }
}

export const editItemQuantityByCode = async (req, res) => {
    const code = parseInt(req.params.code);
    if(!code) return res.status(400).send({message:"Falta el código"})
    const body = req.body;
    
    const data = {
        stockQuantity:parseInt(body.stockQuantity),
    }
try {
        const item = await itemRepository.updateItemByCode(code, data)
        if (!item){return  res.status(400).send({message:"NO existe el Artículo"})}
            logInfo.info("Stock de artículo actualizado por Código")
        return  res.status(200).send({message:"Stock de Artículo actualizado"})
    } catch (error) {
        logInfo.info("error por código")
        return res.status(500).send({ message: error })
    }
}
 
export const editStockItemByCode = async (req, res) => {
    const code = parseInt(req.params.code);
    
    if(!code) return res.status(400).send({message:"Falta el código"})
    const body = req.body;
    if(!body) return res.status(400).send({message:"Falta la cantidad"})
        
    const data = {stockQuantity:parseInt(body.quantity)}
    
try {
        const item = await itemRepository.updateStockItemByCode(code, data)
        if (!item){return  res.status(400).send({message:"NO existe el Artículo"})}
            logInfo.info("Stock de artículo actualizado por Código")
        return  res.status(200).send({message:"Stock de Artículo actualizado"})
    } catch (error) {
        logInfo.info("error por código")
        return res.status(500).send({ message: error })
    }


}

export const editItemByName = async (req, res) => { 
    const name = req.params.name;
    if(!name) return res.status(400).send({message:"Falta el nombre"})
    const body = req.body;
    
    const data = {
        code:parseInt(body.code),
        name:body.name,
        stockQuantity:parseInt(body.stockQuantity),
        price:parseFloat(body.price),
        category:body.category,
        brand:body.brand,
        model:body.model,
        origin:body.origin,
        warehouseLocation:body.warehouseLocation,
        description:body.description
    }
try {
        const item = await itemRepository.updateItemByName(name, data)
        if (!item){return  res.status(400).send({message:"NO existe el artículo"})}
            logInfo.info("Artículo actualizado por Nombre")
        return  res.status(200).send({message:"Artículo actualizado"})
    } catch (error) {
        logInfo.info("error por nombre")
        return res.status(500).send({ message: error })
    }
}



export const deleteItem = async (req, res) => {
    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const item = await itemRepository.deleteItem(id)
        if (!item) return res.status(404).json({ message: '"NO" existe el artículo' });
        res.status(200).send({ message: `El artículo fue eliminado correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const deleteItemByCode = async (req, res) => {
    const  code  = parseInt(req.params.code);
    if (!code) return res.status(400).json({ message: "Falta el Code"})
    try {
            const itemDeleted = await itemRepository.disableItem({code:code})
        // if (!itemDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `el artículo fue eliminado correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


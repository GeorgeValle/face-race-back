import { saleRepository } from "../services/IndexRepository.js"
import {logInfo, errorLogger} from '../utils/Logger.js'
//import ClientDTO from '../dto/ClientDTO.js'

export const registerSale = async (req, res) => {
    logInfo.info(`Sale dete: ${req.body.dateSale} `)
    try {
        const sale = await saleRepository.createSale(req.body)
        logInfo.info(`Sale registered:`)
        return res.status(201).json({
            Message:
                `Se ha registrado la venta Número: ${sale.saleNumber} correctamente`
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findSaleBySaleNumber = async (req, res) => {
    try {
        const sale = await saleRepository.getDaleBySaleNumber({ saleNumber: parseInt(req.params.saleNumber) })
        if (sale.active==false) { throw new Error("el registro de venta está inactivo");}
         //res.status(404).send({message:})}
        logInfo.info("Venta encontrada por Número de Venta")
        logInfo.info(sale)

        return res.status(200).send({sale:sale})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findSalesByName = async (req, res) => {
    try {
        const sales = await saleRepository.getSalesByName(req.params.name )
        //if (sale.active==false) { throw new Error("el regsitro de venta está inactivo");}
        logInfo.info("sales founded by client name")
        logInfo.info(sales)

        return res.status(200).send({sales:sales})
    } catch (error) {
        res.status(500).json({ message: error })
    }
} 

export const findSalesByDate = async (req,res) =>{
    try {
        const dateInit = new Date (req.params.dateInit.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' }))
        const dateEnd = new Date (req.params.dateEnd.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' }))
        
        const DateIso = new Date({saleDate: { $gte: dateInit, $lte: dateEnd }});
        const sales = await saleRepository.getSalesByDate(DateIso)
        logInfo.info("sales founded by date")
        logInfo.info(sales)
        return res.status(200).send({sales:sales})
        } catch (error) {
            res.status(500).json({ message: error })
            }
        }


/* export const findItemsByCategory = async (req, res) => {
    try {
        const items = await itemRepository.getItemsByCategory(req.params.category )
        logInfo.info("Artículos encontrados por Categoría")
        logInfo.info(items)

        return res.status(200).send(items)
    } catch (error) {
        res.status(500).json({ message: error })
    }
} */

/*export const findSaleleNumber = async(req, res) =>{
    try {
        const sale = await saleRepository.getSaleByNumberSale(req.params.saleNumber)
        logInfo.info("sale registered founded")
        logInfo.info(sale)

        return res.status(200).send(sale)
    }catch(error){
        res.status(500).json({message:error})
    }
    
}*/

export const findSaleById = async (req, res) => {
    try {
        const sale = await saleRepository.getSaleById(req.params.id)
        return res.status(200).send({ data: sale })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}



export const editSaleById = async (req, res) => {
    try {
        //const data = req.body;
        const sale = await saleRepository.updateSalemById(req.params.id, req.body);
        if (!sale) return  res.status(400).json({message:"No se actualizó la venta"});
        return res.status(200).json({ message: `Se ha actualizado el registro de venta ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editSaleBySaleNumber = async (req, res) => {
    const saleNumber = req.params.saleNumber;
    if(!saleNumber) return res.status(400).send({message:"Falta el número de venta"})
    const data = req.body;
    
   /* const data = {
        code:body.code,
        name:body.name,
        stockQuantity:body.stockQuantity,
        price:body.price,
        category:body.category,
        brand:body.brand,
        model:body.model,
        origin:body.origin,
        warehouseLocation:body.warehouseLocation,
        description:body.description
    } */
try {
        const sale = await saleRepository.updateSaleBySaleNUmber(saleNumber, data)
        if (!sale){return  res.status(400).send({message:"NO existe la venta"})}
            logInfo.info("sale updated by saleNumber")
        return  res.status(200).send({message:"Venta actualizada"})
    } catch (error) {
        logInfo.info("error to update by SaleNumber")
        return res.status(500).send({ message: error })
    }
}

/*export const editItemQuantityByCode = async (req, res) => {
    const code = req.params.code;
    if(!code) return res.status(400).send({message:"Falta el código"})
    const body = req.body;
    
    const data = {
        stockQuantity:body.stockQuantity,
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

export const editItemByName = async (req, res) => {
    const name = req.params.name;
    if(!name) return res.status(400).send({message:"Falta el nombre"})
    const body = req.body;
    
    const data = {
        code:body.code,
        name:body.name,
        stockQuantity:body.stockQuantity,
        price:body.price,
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
*/


export const deleteSale = async (req, res) => {
    try {
        const id  = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const sale = await saleRepository.deleteSale(id)
        if (!sale) return res.status(404).json({ message: '"NO" existe La venta' });
        res.status(200).send({ message: `La venta fue eliminada correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const disableSaleBySaleNumber = async (req, res) => {
    const  saleNumber  = parseInt(req.params.saleNumber);
    if (!saleNumber) return res.status(400).json({ message: "Falta el Número de venta"})
    try {
            const saleDisabled = await saleRepository.disableSale({saleNumber:saleNumber})
        // if (!itemDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `La venta fue Desahabilitada correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const enableSaleBySaleNumber = async (req, res) => {
    const  saleNumber  = parseInt(req.params.saleNumber);
    if (!saleNumber) return res.status(400).json({ message: "Falta el Número de venta"})
    try {
            const saleEnabled = await saleRepository.enableSale({saleNumber:saleNumber})
        // if (!itemDeleted) return res.status(404).json({ message: 'NO existe'})
            res.status(200).send({ message: `La venta fue habilitada correctamente`})
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


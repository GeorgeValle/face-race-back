import { purchaseRepository } from "../services/IndexRepository.js"
import { logInfo, errorLogger } from '../utils/Logger.js'
import { editItemQuantityByCode } from "./ItemController.js"
//import ClientDTO from '../dto/ClientDTO.js'

export const registerPurchase = async (req, res) => {
    logInfo.info(`Purchase date: ${req.body.saleDate} `)
    try {
        const purchase = await purchaseRepository.createSale(req.body)
        logInfo.info(`Sale registered:`)
        return res.status(201).json({
            message:
                `Se ha registrado la venta Número: ${sale.saleNumber} correctamente`
        })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findTotalPaymentsByYear = async (req, res) => {
    try {
        const year = req.params.year; // Tomar el año desde la URL
        logInfo.info(year)
        if (!year) {
            return res.status(400).json({ error: "Debe proporcionar un año válido." });
        }

        //const saleRepository = new SaleRepository(Sale);
        const result = await purchaseRepository.getTotalOfPaymentsByYear(parseInt(year));

        // Convertir el resultado en un objeto con nombres de meses
        const monthNames = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const formattedResult = result.reduce((acc, item) => {
            acc[monthNames[item._id.month - 1]] = item.totalAmount;
            return acc;
        }, {});

        logInfo.info(formattedResult)
        logInfo.info("Venta por año")
        return res.json({ data: formattedResult });
    } catch (error) {
        console.error("Error al obtener pagos por mes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const findTotalProductAmountByCodeAndMonth = async (req, res) => {

    try {
        const { code, year } = req.params; // Obtein params of the URL

        if (!code || !year ) {
            return res.status(400).json({ error: "Debe proporcionar un código y un año válido." });
        }

        //const saleRepository = new SaleRepository(Sale);
        const result = await purchaseRepository.getTotalProductAmountByCodeAndMonth(Number(code), Number(year));

        // Convertir el resultado en un objeto con nombres de meses
        const monthNames = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const formattedResult = result.reduce((acc, item) => {
            acc[monthNames[item._id.month - 1]] = item.totalAmount;
            return acc;
        }, {});

        logInfo.info(formattedResult)
        return res.json({data:formattedResult});
    } catch (error) {
        console.error("Error al obtener montos de productos por código y mes:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const findPurchasesByDniAndYear = async (req, res) => {
    try {
        const { dni, year } = req.params; // queries params
        logInfo.info(`${dni} - ${year}`)
        if (!dni || !year) {
            return res.status(400).json({ error: "Debe proporcionar un DNI y un año válidos." });
        }

        //const saleRepository = new SaleRepository(Sale);
        const purchases = await purchaseRepository.getSalesByDniAndYear(Number(dni), Number(year));

        return res.json({ data: purchases });
    } catch (error) {
        console.error("Error al obtener ventas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

export const findTotalPaymentsByTypeAndMonth = async (req, res) => {
    try {
        const { type, year } = req.params; // Obtener parámetros de la URL

        if (!type || !year) {
            return res.status(400).json({ error: "Debe proporcionar un tipo de pago y un año válido." });
        }
        logInfo.info(`${type} - ${year}`)
        //const saleRepository = new SaleRepository(Sale);
        const result = await saleRepository.getTotalPaymentsByTypeAndMonth(type, Number(year));

        // Convertir el resultado en un objeto con nombres de meses
        const monthNames = [
            "enero", "febrero", "marzo", "abril", "mayo", "junio",
            "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];

        const formattedResult = result.reduce((acc, item) => {
            acc[monthNames[item._id.month - 1]] = item.totalAmount;
            return acc;
        }, {});
        logInfo.info(formattedResult)
        return res.json({ data: formattedResult });

    } catch (error) {
        console.error("Error al obtener pagos por tipo y mes:", error);
        res.status(500).json({ error: "Error interno del servidor", message: "Error Interno" });
    }
}

export const findPurchaseByPurchaseNumber = async (req, res) => {
    try {
        const sale = await saleRepository.getSaleBySaleNumber( Number(req.params.saleNumber) )
        if (sale.active == false) { throw new Error("el registro de venta está inactivo"); }
        //res.status(404).send({message:})}
        
        logInfo.info("Sale Founded by Sale Number")
        

        const formattedSale ={
            _id:sale._id,
            saleNumber: sale.saleNumber,
            saleDate: sale.saleDate,
            saleTime: sale.saleTime,
            payment:sale.payment,
            itemList:sale.itemList,
            description: sale.description,
            client: sale.client,
            paid: sale.paid
        }
        logInfo.info(formattedSale)
        return res.status(200).send({ data: formattedSale })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const findPurchasesByName = async (req, res) => {
    try {
        const sales = await saleRepository.getSalesByName(req.params.name)
        //if (sale.active==false) { throw new Error("el regsitro de venta está inactivo");}
        logInfo.info("sales founded by client name")
        logInfo.info(sales)

        return res.status(200).send({ sales: sales })
    } catch (error) {
        return res.status(500).json({ message: error })
    }
}

export const findPurchasesByDate = async (req, res) => {
    try {
        const dateInit = new Date(req.params.dateInit.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' }))
        const dateEnd = new Date(req.params.dateEnd.toLocaleString('es-AR', { timeZone: 'America/Buenos_Aires' }))

        const DateIso = new Date({ saleDate: { $gte: dateInit, $lte: dateEnd } });
        const sales = await saleRepository.getSalesByDate(DateIso)
        logInfo.info("sales founded by date")
        logInfo.info(sales)
        return res.status(200).send({ sales: sales })
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

export const findPurchaseById = async (req, res) => {
    try {
        const sale = await purchaseRepository.getPurchaseById(req.params.id)
        return res.status(200).send({ data: sale })
    } catch (error) {
        res.status(404).json({ message: error })
    }
}

export const findPurchasesByMonthAndYear = async (req, res) => {

    const month = req.params.month;
    const year = req.params.year;

    logInfo.info("find many M and Y")
    logInfo.info(month, "- y - ", year)

    // const currentDate = new Date();
    // const currentMonth = currentDate.getMonth() + 1;
    // const currentYear = currentDate.getFullYear();

    // const formatSales = (sales) => {
    //     return sales.reduce((formattedSales, sale) => {
    //         const { active, createdAt, updatedAt, __v, ...filteredSale } = sale;
    //         formattedSales.push(filteredSale);
    //         return formattedSales;
    //     }, []);
    // };
    const formatPurchases = (purchases) => {
        if (!Array.isArray(purchases)) {
            throw new Error('El parámetro recibido no es un array');
        }

        return purchases.reduce((formattedPurchases, purchase) => {
            formattedPurchases.push({
                _id: sale._id,
                payment: sale.payment,
                itemList: sale.itemList,
                description: sale.description,
                saleDate: sale.saleDate,
                saleTime: sale.saleTime,
                paid: sale.paid,
                client: sale.client,
                saleNumber: sale.saleNumber
            });
            return formattedPurchases;
        }, []);
    };


    try {

        const purchases = await purchaseRepository.getPurchasesByMonthAndYear(month, year)

        const formattedPurchases = formatPurchases(purchases)

        return res.status(200).send({ data: formattedPurchases })
    } catch {
        throw new Error("Is not Array")
    }
}



export const editPurchaseById = async (req, res) => {
    try {
        //const data = req.body;
        const purchase = await purchaseRepository.updatePurchaseById(req.params.id, req.body);
        if (!purchase) return res.status(400).json({ message: "No se actualizó la venta" });
        return res.status(200).json({ message: `Se ha actualizado el registro de venta ` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const editPurchaseByPurchaseNumber = async (req, res) => {
    const purchaseNumber = req.params.purchaseNumber;
    if (!saleNumber) return res.status(400).send({ message: "Falta el número de venta" })
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
        const purchase = await saleRepository.updateSaleBySaleNumber(saleNumber, data)
        if (!purchase) { return res.status(400).send({ message: "NO existe la venta" }) }
        logInfo.info("sale updated by saleNumber")
        return res.status(200).send({ message: "Venta actualizada" })
    } catch (error) {
        logInfo.info("error to update by SaleNumber")
        return res.status(500).send({ message: error })
    }
}

export const editDescriptionBySaleNumber = async (req, res) => {
    const saleNumber = req.params.saleNumber;
    if (!saleNumber) return res.status(400).send({ message: "Falta el número de venta" })
    //const data = req.body;

    const data = {
        description:req.body.description
    }
    try {
        const sale = await purchaseRepository.updatePurchaseByPurchaseNumber(saleNumber, data)
        if (!sale) { return res.status(400).send({ message: "NO existe la venta" }) }
        logInfo.info(" description purchase updated by saleNumber")
        return res.status(200).send({ message: "Descripción de venta actualizada" })
    } catch (error) {
        logInfo.info("error to update description by PurchaseNumber")
        return res.status(500).send({ message: error })
    }
}

export const editPaidStateBySaleNumber = async (req, res) => {
    const saleNumber = req.params.saleNumber;
    if (!saleNumber) return res.status(400).send({ message: "Falta el número de venta" })

    const data = { paid:req.body.paid }
    logInfo.info(data)
    try {
        const sale = await saleRepository.updateSaleBySaleNumber(saleNumber, data)
        if (!sale) { return res.status(400).send({ message: "NO existe la venta" }) }
        logInfo.info(" description sale updated by saleNumber")
        return res.status(200).send({ message: "Estado del pago de la venta actualizado" })
    } catch (error) {
        logInfo.info("error to update paid state by SaleNumber")
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
        const id = req.params.id;
        if (!id) return res.status(400).json({ message: "Falta el Id" });
        const sale = await saleRepository.deleteSale(id)
        if (!sale) return res.status(404).json({ message: '"NO" existe La venta' });
        res.status(200).send({ message: `La venta fue eliminada correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const disableSaleBySaleNumber = async (req, res) => {
    const saleNumber = parseInt(req.params.saleNumber);
    if (!saleNumber) return res.status(400).json({ message: "Falta el Número de venta" })
    try {
        const saleDisabled = await saleRepository.disableSale({ saleNumber: saleNumber })
        // if (!itemDeleted) return res.status(404).json({ message: 'NO existe'})
        res.status(200).send({ message: `La venta fue Desahabilitada correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}

export const enableSaleBySaleNumber = async (req, res) => {
    const saleNumber = parseInt(req.params.saleNumber);
    if (!saleNumber) return res.status(400).json({ message: "Falta el Número de venta" })
    try {
        const saleEnabled = await saleRepository.enableSale({ saleNumber: saleNumber })
        // if (!itemDeleted) return res.status(404).json({ message: 'NO existe'})
        res.status(200).send({ message: `La venta fue habilitada correctamente` })
    } catch (error) {
        res.status(500).json({ message: error })
    }
}


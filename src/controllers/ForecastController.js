import { saleRepository } from "../services/IndexRepository.js";
import axios from 'axios';
import { logInfo } from '../utils/Logger.js'

// Función para convertir fechas al formato argentino dd-mm-YYYY
function formatDateToArg(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export async function getForecast(req, res) {
    try {
        const { year } = req.params; // año recibido desde ForecastRouter
        const numericYear = parseInt(year, 10);

        // Paso 1: obtener ventas agrupadas por mes
        const monthlyTotals = await saleRepository.getSalesGroupedByDate(numericYear);


        // for (let m = 1; m <= 12; m++) {
        //     const found = results.find(r => r._id === m);
        //     monthlyTotals[m] = found ? found.total : 0;
        // }

        // Paso 2: transformar a formato Prophet (ds, y)
        const series = Object.entries(monthlyTotals).map(([month, total]) => {
            const ds = new Date(numericYear, month - 1, 1).toISOString().split('T')[0];
            return { ds, y: total };
        });

        // Paso 3: enviar al microservicio FastAPI
        const response = await axios.post('http://localhost:8000/predict', {
            series: series,  // importante: coincide con tu modelo Pydantic
            periods: 13
        });

        // Paso 4: responder al front
        // const { forecast, history, changepoints, advice } = response.data;
        // res.json({ forecast, history, changepoints, advice });



        logInfo.info(response.data);
        const { forecast, history, changepoints, advice, totalForecast } = response.data;

        const formattedForecast = forecast.map(item => ({
            ...item,
            ds: formatDateToArg(item.ds)
        }));

        res.json({
            forecast: formattedForecast,
            history,
            changepoints,
            advice,
            totalForecast
        });

    } catch (error) {
        console.error('Error en getForecast:', error);
        res.status(500).json({ error: 'Error al generar predicción' });
    }
}



// import axios from'axios';
// import Sale from '../models/Sale'; // o tu repositorio
// const moment = require('moment');

// const getForecast = async (req, res) => {
//     try {
//         const year = new Date().getFullYear();

//         // Paso 1: Obtener todas las ventas del año
//         const sales = await Sale.find({
//             saleDate: {
//                 $gte: new Date(`${year}-01-01`),
//                 $lte: new Date(`${year}-12-31`)
//             }
//         });

//         // Paso 2: Agrupar por día y sumar montos
//         const dailyTotals = {};
//         sales.forEach(sale => {
//             const date = moment(sale.saleDate).format('YYYY-MM-DD');
//             const total = sale.payment.reduce((sum, p) => sum + Number(p.amount), 0);
//             dailyTotals[date] = (dailyTotals[date] || 0) + total;
//         });

//         // Paso 3: Rellenar días faltantes con 0
//         const start = moment(`${year}-01-01`);
//         const end = moment(`${year}-12-31`);
//         const fullSeries = [];

//         for (let d = start.clone(); d.isSameOrBefore(end); d.add(1, 'day')) {
//             const dateStr = d.format('YYYY-MM-DD');
//             fullSeries.push({
//                 ds: dateStr,
//                 y: dailyTotals[dateStr] || 0
//             });
//         }

//         // Paso 4: Enviar al microservicio FastAPI
//         const response = await axios.post('http://localhost:8000/predict', {
//             data: fullSeries
//         });

//         // Paso 5: Responder al frontend
//         const { forecast, history, changepoints, advice } = response.data;

//         res.json({
//             forecast,
//             history,
//             changepoints,
//             advice
//         });

//     } catch (error) {
//         console.error('Error en forecastController:', error);
//         res.status(500).json({ error: 'Error al generar predicción' });
//     }
// };

// module.exports = { getForecast };
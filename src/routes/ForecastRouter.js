// routes/forecastRouter.js
import express from 'express';
import { getForecast } from '../controllers/ForecastController.js';

const router = express.Router();

// Route: /api/forecast/:year
router.get('/:year', getForecast);

export default router;
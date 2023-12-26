import express from 'express';
import index from '../controllers/statistics.js';
import catchAsync from '../utils/catchAsync.js';
import Internship from '../models/internship.js';

const statisticsRoutes = express.Router();


statisticsRoutes.route('/')
    .get(catchAsync(index))

export default statisticsRoutes;
const express = require('express');
const router = express.Router();
const statistics = require('../controllers/statistics');
const catchAsync = require('../utils/catchAsync');
const Internship = require('../models/internship');

router.route('/')
    .get(catchAsync(statistics.index))

module.exports = router;
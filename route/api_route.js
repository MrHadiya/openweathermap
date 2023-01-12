const express = require("express");
const router = express.Router();

const apiController = require('../controllers/api');
router.get('/get-city-pollution', apiController.getCityPollutionData);

module.exports = router;
const express = require('express');
const router = express.Router();
const CityController = require('../app/controllers/CityController');

/**
 * @openpi
 * /api/cities
 * post:
 *  tags:
 *      -cities:
 *      summary: get api for all cities
 */
router.get('/api/cities/:stateId', CityController.get);

module.exports = router;

const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/recruiterController');
const vacancyController = require('../app/controllers/vacancyController');
const dashboardController = require('../app/controllers/DashboardController');
/**
 * @openpi
 * /api/vacancy
 * get:
 *  tags:
 *      -vacancy:
 *      summary: get vacancys api
 */
router.get('/api/vacancy', vacancyController.get);

/**
 * @openpi
 * /api/vacancy
 * post:
 *  tags:
 *      -vacancy:
 *      summary: Create vacancy api
 */
router.post('/api/vacancy', vacancyController.create);
/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -vacancy:
 *      summary: Update api for vacancy
 */
router.put('/api/vacancy', vacancyController.update);

/**
 * @openpi
 * /api/vacancy
 * delete:
 *  tags:
 *      -vacancy:
 *      summary: delete api for vacancy
 */
router.delete('/api/vacancy', vacancyController.delete);

module.exports = router;

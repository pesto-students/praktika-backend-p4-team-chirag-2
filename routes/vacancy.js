const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/recruiterController');
const {
  getData,
  create,
  update,
  deleteData,
} = require('../app/controllers/vacancyController');
const dashboardController = require('../app/controllers/DashboardController');
const authenticateToken = require('../middelware/jwt');
/**
 * @openpi
 * /api/vacancy
 * get:
 *  tags:
 *      -vacancy:
 *      summary: get vacancys api
 */
router.get('/api/vacancy', authenticateToken, getData);

/**
 * @openpi
 * /api/vacancy
 * post:
 *  tags:
 *      -vacancy:
 *      summary: Create vacancy api
 */
router.post('/api/vacancy', authenticateToken, create);
/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -vacancy:
 *      summary: Update api for vacancy
 */
router.put('/api/vacancy', authenticateToken, update);

/**
 * @openpi
 * /api/vacancy
 * delete:
 *  tags:
 *      -vacancy:
 *      summary: delete api for vacancy
 */
router.delete('/api/vacancy', authenticateToken, deleteData);

module.exports = router;

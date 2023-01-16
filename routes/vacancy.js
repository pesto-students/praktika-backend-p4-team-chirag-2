const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/RecruiterController');
const {
  getjobcategory,
  getSkills,
  getData,
  create,
  update,
  deleteData,
} = require('../app/controllers/VacancyController');
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

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all skills api
 */
router.get('/api/vacancy/getskills', authenticateToken, getSkills);

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all Job Category api
 */
router.get('/api/vacancy/getjobcategory', authenticateToken, getjobcategory);

module.exports = router;

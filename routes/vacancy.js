const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/RecruiterController');
const {
  getCountrys,
  getStates,
  getCitys,
  getjobcategory,
  getSkills,
  getData,
  create,
  update,
  deleteData,
  getCandidateListing,
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

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all Country api
 */
router.get('/api/vacancy/getCountrys', authenticateToken, getCountrys);

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all States api
 */
router.post('/api/vacancy/getStates', authenticateToken, getStates);

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all Citys api
 */
router.post('/api/vacancy/getCitys', authenticateToken, getCitys);

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all Candidate api
 */
router.get(
  '/api/vacancy/getCandidateListing',
  authenticateToken,
  getCandidateListing
);

/**
 * @openpi
 * /api/vacancy
 * put:
 *  tags:
 *      -skills:
 *      summary: Get all Candidate api
 */
// router.put(
//   '/api/vacancy/sendrequest',
//   recrutirerController.sentcandidateinvite
// );

module.exports = router;

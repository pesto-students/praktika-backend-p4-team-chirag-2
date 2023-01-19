const express = require('express');
const router = express.Router();
const {
  getPendingVacancy,
  getAllCount,
  getPendingInterviews,
} = require('../app/controllers/dashboardController');
const authenticateToken = require('../middelware/jwt');

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api for get All Count
 */
router.get('/api/dashboard', authenticateToken, getAllCount);

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api get Pending Vacancy
 */
router.get(
  '/api/dashboard/getPendingVacancy',
  authenticateToken,
  getPendingVacancy
);

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api for get Pending Interviews
 */
router.get(
  '/api/dashboard/getPendingInterviews',
  authenticateToken,
  getPendingInterviews
);

module.exports = router;

const express = require('express');
const router = express.Router();
const {
  getPendingVacancy,
  getAllCount,
  getPendingInterviews,
} = require('../app/controllers/dashboardController');

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api for get All Count
 */
router.get('/api/dashboard', getAllCount);

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api get Pending Vacancy
 */
router.get('/api/dashboard/getPendingVacancy', getPendingVacancy);

/**
 * @openpi
 * /api/dashboard
 * post:
 *  tags:
 *      -dashboard:
 *      summary: get api for get Pending Interviews
 */
router.get('/api/dashboard/getPendingInterviews', getPendingInterviews);

const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/recrutirerController');
const vacancyController = require('../app/controllers/vacancyController');
const dashboardController = require('../app/controllers/DashboardController');

/**
 * @openpi
 * /api/recrutirer/get
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: get api for recrutirer pofile
 */
router.post(
  '/api/recrutirer/dashboard',
  recrutirerController.dashboardController
);

/**
 * @openpi
 * /api/recrutirer/get
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create vacancy api for the recrutirer profie
 */
router.get('/api/recrutirer', recrutirerController.get);

/**
 * @openpi
 * /api/recrutirer/create
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create vacancy api for the recrutirer profie
 */
router.post('/api/recrutirer', recrutirerController.create);
/**
 * @openpi
 * /api/recrutirer/update
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Update api for recrutirer pofile
 */
router.put('/api/recrutirer', recrutirerController.update);

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
 *      -recrutirer:
 *      summary: delete api for recrutirer pofile
 */
router.delete('/api/vacancy/delete', vacancyController.delete);

/**
/**
 * @openpi
 * /api/recrutirer/getcandidates
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Get all candidate by filter
 */
router.post(
  '/api/recrutirer/getcandidates',
  recrutirerController.getcandidatelist
);

/**
 * @openpi
 * /api/recrutirer/candidate/sendrequest
 * post:
 *  tags:
 *      -recrutirer candidate sent request:
 *      summary: sent request to candidate regarding job vacancy
 */
router.put(
  '/api/recrutirer/candidate/sendrequest',
  recrutirerController.sentcandidateinvite
);

module.exports = router;

const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/recrutirerController');

/**
 * @openpi
 * /api/recrutirer/get
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: get api for recrutirer pofile
 */
router.post('/api/recrutirer/dashboard', recrutirerController.get);

/**
 * @openpi
 * /api/recrutirer/create
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create vacancy api for the recrutirer profie
 */
router.post('/api/recrutirer/vacancy/create', recrutirerController.create);
/**
 * @openpi
 * /api/recrutirer/update
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Update api for recrutirer pofile
 */
router.post('/api/recrutirer/vacancy/update', recrutirerController.update);

/**
 * @openpi
 * /api/recrutirer/joblist
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: delete api for recrutirer pofile
 */
router.get('/api/recrutirer/vacancy/delete', recrutirerController.delete);

/**
 * @openpi
 * /api/recrutirer/acceptinvite
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Update api for recrutirer pofile
 */
router.get('/api/recrutirer/joblist', recrutirerController.getjoblist);

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
 * /api/recrutirer/getcandidates
 * post:
 *  tags:
 *      -recrutirer candidate sent request:
 *      summary: sent request to candidate regarding job vacancy
 */
router.get(
  '/api/recrutirer/candidate/sendrequest',
  recrutirerController.sentcandidateinvite
);

module.exports = router;

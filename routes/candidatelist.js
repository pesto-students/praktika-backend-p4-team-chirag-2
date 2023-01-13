const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/recruiterController');

/**
/**
 * @openpi
 * /api/recrutirer/getcandidates
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Get all candidate by filter
 */
router.get('/api/candidates-list', recrutirerController.getcandidatelist);

/**
 * @openpi
 * /api/recrutirer/candidate/sendrequest
 * post:
 *  tags:
 *      -recrutirer candidate sent request:
 *      summary: sent request to candidate regarding job vacancy
 */
router.put(
  '/api/recrutirer/candidates-list/sendrequest',
  recrutirerController.sentcandidateinvite
);

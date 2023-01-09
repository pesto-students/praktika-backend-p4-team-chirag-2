const express = require('express');
const router = express.Router();
const CandidateController = require('../app/controllers/CandidateController');

/**
 * @openpi
 * /api/candidate/get
 * post:
 *  tags:
 *      -Candidate:
 *      summary: get api for candidate pofile
 */
router.get('/api/candidate/get', CandidateController.get);

/**
 * @openpi
 * /api/candidate/create
 * post:
 *  tags:
 *      -Candidate:
 *      summary: Create api for the candidate profie
 */
router.post('/api/candidate/create', CandidateController.create);
/**
 * @openpi
 * /api/candidate/update
 * post:
 *  tags:
 *      -Candidate:
 *      summary: Update api for candidate pofile
 */
router.put('/api/candidate/update', CandidateController.update);

/**
 * @openpi
 * /api/candidate/joblist
 * get:
 *  tags:
 *      -Candidate Job Offers:
 *      summary: Candidate Job Offers List api
 */
router.get('/api/candidate/joblist', CandidateController.joblist);

/**
 * @openpi
 * /api/candidate/acceptinvite
 * put:
 *  tags:
 *      -Candidate:
 *      summary: accept job invite api for candidate pofile
 */
router.put('/api/candidate/acceptinvite', CandidateController.acceptinvite);

module.exports = router;

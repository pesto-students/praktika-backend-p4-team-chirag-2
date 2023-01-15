const express = require('express');
const router = express.Router();
const {
  getData,
  create,
  update,
} = require('../app/controllers/CandidateController');
const authenticateToken = require('../middelware/jwt');

/**
 * @openpi
 * /api/candidate/get
 * post:
 *  tags:
 *      -Candidate:
 *      summary: get api for candidate pofile
 */
router.get('/api/candidate', authenticateToken, getData);

/**
 * @openpi
 * /api/candidate/create
 * post:
 *  tags:
 *      -Candidate:
 *      summary: Create api for the candidate profie
 */
router.post('/api/candidate', authenticateToken, create);
/**
 * @openpi
 * /api/candidate/update
 * post:
 *  tags:
 *      -Candidate:
 *      summary: Update api for candidate pofile
 */
router.put('/api/candidate', authenticateToken, update);

module.exports = router;

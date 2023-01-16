const express = require('express');
const router = express.Router();
const {
  getData,
  create,
  update,
} = require('../app/controllers/CandidateController');
const {
  uploadResume,
  uploadVideo,
} = require('../app/controllers/FileUploadController');
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

// create an endpoint for file uploads
router.post(
  '/api/uploadresume',
  authenticateToken,
  uploadResume.single('file'),
  (req, res, next) => {
    if (!req.file) {
      res.status(400).send({ error: 'Please provide a file to upload' });
    } else {
      res.send({ url: req.file.location });
    }
  }
);

router.post(
  '/api/uploadvideo',
  authenticateToken,
  uploadVideo.single('file'),
  (req, res, next) => {
    if (!req.file) {
      res.status(400).send({ error: 'Please provide a file to upload' });
    } else {
      res.send({ url: req.file.location });
    }
  }
);

module.exports = router;

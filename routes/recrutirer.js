const express = require('express');
const router = express.Router();
const {
  get,
  create,
  update,
} = require('../app/controllers/RecruiterController');
const authenticateToken = require('../middelware/jwt');
/**
 * @openpi
 * /api/recrutirer/get
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create api for the recrutirer profie
 */
router.get('/api/recrutirer', authenticateToken, get);

/**
 * @openpi
 * /api/recrutirer
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create api for the recrutirer profie
 */
router.post('/api/recrutirer', authenticateToken, create);
/**
 * @openpi
 * /api/recrutirer
 * put:
 *  tags:
 *      -recrutirer:
 *      summary: Update api for recrutirer pofile
 */
router.put('/api/recrutirer', authenticateToken, update);

module.exports = router;

const express = require('express');
const router = express.Router();
const recrutirerController = require('../app/controllers/recruiterController');

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
 * /api/recrutirer
 * post:
 *  tags:
 *      -recrutirer:
 *      summary: Create vacancy api for the recrutirer profie
 */
router.post('/api/recrutirer', recrutirerController.create);
/**
 * @openpi
 * /api/recrutirer
 * put:
 *  tags:
 *      -recrutirer:
 *      summary: Update api for recrutirer pofile
 */
router.put('/api/recrutirer', recrutirerController.update);

module.exports = router;

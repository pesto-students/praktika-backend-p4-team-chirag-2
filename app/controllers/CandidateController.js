const models = require('../models');
const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

/**
 * User registration.
 *
 * @param {string}      first_name
 * @param {string}      last_name
 * @param {string}      email
 * @param {string}      password
 * @param {string}      confirm_password
 *
 * @returns {Object}
 */
exports.create = [
  // Validate fields.
  check('first_name').isLength({ min: 3 }),
  check('last_name').isLength({ min: 3 }),
  check('job_category_id').isInt(),
  check('total_expeiance').isDecimal(),
  check('currancy_id').isInt(),
  check('current_ctc').isDecimal(),
  check('expected_ctc').isDecimal(),
  check('resume_url').isURL(),
  check('video_url').isURL(),
  check('website_link').isURL(),
  check('linked_link').isURL(),
  check('github_link').isURL(),
  check('facebook_link').isURL(),
  check('twitter_link').isURL(),
  check('current_address_line_1').isLength({ min: 3 }),
  check('current_address_line_2').isLength({ min: 3 }),
  check('current_country_id').isInt(),
  check('current_city_id').isInt(),
  check('current_state_id').isInt(),
  check('current_zip_code').isLength({ min: 3 }),
  check('permanent_address_line_1').isLength({ min: 3 }),
  check('permanent_address_line_2').isLength({ min: 3 }),
  check('permanent_country_id').isInt(),
  check('permanent_city_id').isInt(),
  check('permanent_state_id').isInt(),
  check('permanent_zip_code').isLength({ min: 3 }),
  // Process request after validation and sanitization.
  async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      else {
        try {
          // Extract the validation errors from a request.
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(
              res,
              'Validation Error.',
              errors.array()
            );
          } else {
            const personal_information = models.personal_information.create(
              req.body
            );
            return apiResponse.successResponseWithData(
              res,
              'Registration Success.',
              personal_information
            );
          }
        } catch (error) {
          //throw error in json response with status 500.
          return apiResponse.ErrorResponse(res, error.message);
        }
      }
    });
  },
];

exports.update = [
  // Validate fields.
  check('first_name').isLength({ min: 3 }),
  check('last_name').isLength({ min: 3 }),
  check('job_category_id').isInt(),
  check('total_expeiance').isDecimal(),
  check('currancy_id').isInt(),
  check('current_ctc').isDecimal(),
  check('expected_ctc').isDecimal(),
  check('resume_url').isURL(),
  check('video_url').isURL(),
  check('website_link').isURL(),
  check('linked_link').isURL(),
  check('github_link').isURL(),
  check('facebook_link').isURL(),
  check('twitter_link').isURL(),
  check('current_address_line_1').isLength({ min: 3 }),
  check('current_address_line_2').isLength({ min: 3 }),
  check('current_country_id').isInt(),
  check('current_city_id').isInt(),
  check('current_state_id').isInt(),
  check('work_experience').isArray(),
  check('current_zip_code').isLength({ min: 3 }),
  check('permanent_address_line_1').isLength({ min: 3 }),
  check('permanent_address_line_2').isLength({ min: 3 }),
  check('permanent_country_id').isInt(),
  check('permanent_city_id').isInt(),
  check('permanent_state_id').isInt(),
  check('permanent_zip_code').isLength({ min: 3 }),
  // Process request after validation and sanitization.
  async (req, res) => {
    const token = req.headers['x-access-token'];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      else {
        try {
          // Extract the validation errors from a request.
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            // Display sanitized values/errors messages.
            return apiResponse.validationErrorWithData(
              res,
              'Validation Error.',
              errors.array()
            );
          } else {
            req.body.userId = decoded.id;
            const personalInformation = models.personal_information.findByPk(
              req.params.id
            );
            if (!personalInformation) {
              return res
                .status(404)
                .json({ error: 'Personal Information not found' });
            }
            // Update the personal information
            models.personal_information.update({
              first_name: req.body.first_name,
              last_name: req.body.last_name,
              job_category_id: req.body.job_category_id,
              total_expeiance: req.body.total_expeiance,
              currancy_id: req.body.currancy_id,
              current_ctc: req.body.current_ctc,
              expected_ctc: req.body.expected_ctc,
              resume_url: req.body.resume_url,
              video_url: req.body.video_url,
              website_link: req.body.website_link,
              linked_link: req.body.linked_link,
              github_link: req.body.github_link,
              facebook_link: req.body.facebook_link,
              twitter_link: req.body.twitter_link,
              current_address_line_1: req.body.current_address_line_1,
              current_address_line_2: req.body.current_address_line_2,
              current_country_id: req.body.current_country_id,
              current_city_id: req.body.current_city_id,
              current_state_id: req.body.current_state_id,
              current_zip_code: req.body.current_zip_code,
              permanent_address_line_1: req.body.permanent_address_line_1,
              permanent_address_line_2: req.body.permanent_address_line_2,
              permanent_country_id: req.body.permanent_country_id,
              permanent_city_id: req.body.permanent_city_id,
              permanent_state_id: req.body.permanent_state_id,
              permanent_zip_code: req.body.permanent_zip_code,
            });
            return apiResponse.successResponseWithData(
              res,
              'Personal Information Updated.',
              personal_information
            );
          }
        } catch (error) {
          //throw error in json response with status 500.
          return apiResponse.ErrorResponse(res, error.message);
        }
      }
    });
  },
];

exports.get = [
  async (req, res) => {
    console.log('reached api candiadte');
    userId = 0;
    const token = req.headers['x-access-token'];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    await jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        console.log(decoded);
        userId = decoded.id;
        models.personal_information
          .findOne({
            where: {
              user_id: userId,
            },
          })
          .then((personalInformation) => {
            res.json(personalInformation);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
];

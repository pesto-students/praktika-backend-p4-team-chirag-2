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
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
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
            const user = models.PersonalInformation.create(req.body);
            return apiResponse.successResponseWithData(
              res,
              'Registration Success.',
              user
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
    jwt.verify(token, models.UserData, (err, decoded) => {
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
            req.body.userId = decoded['id'];
            const user = models.PersonalInformation.create(req.body);
            return apiResponse.successResponseWithData(
              res,
              'Registration Success.',
              user
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
    userId = 0;
    const token = req.headers['x-access-token'];
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, models.UserData, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        userId = decoded['id'];
        PersonalInformation.findOne({
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

const bcrypt = require('bcrypt');
const models = require('../models');
const jwt = require('jsonwebtoken');
const apiResponse = require('../../helpers/apiResponse');
const { body, validationResult } = require('express-validator');
const company = require('../models/company');

/**
 * User registration.
 *
 * @param {string}      email
 * @param {string}      password
 * @param {string}      mobile_no
 * @param {string}      role_id
 *
 * @returns {Object}
 */
exports.register = [
  // Validate fields.
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .escape(),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.')
    .escape(),
  // Process request after validation and sanitization.
  async (req, res) => {
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
        await bcrypt.hash(req.body.password, 12).then((hashedPassword) => {
          req.body.hashedPassword = hashedPassword;
        });
        const user = await models.users.create(req.body);
        let userData = {
          id: user.id,
          email: user.email,
          role_id: user.role_id,
        };
        //Prepare JWT token for authentication
        const jwtPayload = userData;
        const jwtData = {
          expiresIn: process.env.JWT_TIMEOUT_DURATION + 'h',
        };
        const secret = process.env.JWT_SECRET;
        //Generated JWT token with Payload and secret.
        userData.token = jwt.sign(jwtPayload, secret, jwtData);
        return apiResponse.successResponseWithData(
          res,
          'Registration Success.',
          userData
        );
      }
    } catch (error) {
      //throw error in json response with status 500.
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];

/**
 * User login.
 *
 * @param {string}      email
 * @param {string}      password
 *
 * @returns {Object}
 */
exports.login = [
  body('email')
    .isLength({ min: 1 })
    .trim()
    .withMessage('Email must be specified.')
    .isEmail()
    .withMessage('Email must be a valid email address.')
    .escape(),
  body('password')
    .isLength({ min: 6 })
    .trim()
    .withMessage('Password must be 6 characters or greater.')
    .escape(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return apiResponse.validationErrorWithData(
          res,
          'Validation Error.',
          errors.array()
        );
      } else {
        await models.users
          .findOne({
            attributes: ['id', 'email', 'role_id', 'hashedPassword'],
            where: {
              email: req.body.email,
            },
          })
          .then(async (user) => {
            var company_id = 0;
            if (user.role_id == 2) {
              await models.company
                .findOne({
                  attributes: ['id'],
                  where: {
                    user_id: user.id,
                  },
                })
                .then((company) => (company_id = company.id));
            }
            if (user) {
              bcrypt
                .compare(req.body.password, user.hashedPassword)
                .then((doMatch) => {
                  if (doMatch) {
                    let userData = {
                      id: user.id,
                      first_name: user.first_name,
                      last_name: user.last_name,
                      email: user.email,
                      role_id: user.role_id,
                      company_id: company_id,
                    };
                    //Prepare JWT token for authentication
                    const jwtPayload = userData;
                    const jwtData = {
                      expiresIn: process.env.JWT_TIMEOUT_DURATION + 'h',
                    };
                    const secret = process.env.JWT_SECRET;
                    //Generated JWT token with Payload and secret.
                    userData.token = jwt.sign(jwtPayload, secret, jwtData);
                    return apiResponse.successResponseWithData(
                      res,
                      'Login Success.',
                      userData
                    );
                  } else {
                    return apiResponse.ErrorResponse(
                      res,
                      'Email and password do not match'
                    );
                  }
                });
            } else {
              return apiResponse.ErrorResponse(
                res,
                'Email and password do not match'
              );
            }
          });
      }
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  },
];

const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const company = require('../models/company');

exports.get = [
  async (req, res) => {
    console.log('reached get function');
    userId = 0;
    const token = req.headers['x-access-token'];
    console.log(token);
    if (!token)
      return res
        .status(401)
        .send({ auth: false, message: 'No token provided.' });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res
          .status(500)
          .send({ auth: false, message: 'Failed to authenticate token.' });
      } else {
        userId = decoded.id;
        company
          .findOne({
            where: {
              user_id: userId,
            },
          })
          .then((company) => {
            res.json(company);
          })
          .catch((error) => {
            res.status(500).send(error);
          });
      }
    });
  },
];

exports.create = [
  // Validate fields.
  check('companyName').exists().withMessage('Company Name is required'),
  check('companySize').exists().withMessage('Company Size is required'),
  check('industry').exists().withMessage('Industry is required'),
  // Process request after validation and sanitization.
  (req, res) => {
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
            return res.status(422).json({ errors: errors.array() });
          }
          try {
            // Create the recruiter
            const company = company.create({
              companyName: req.body.companyName,
              companySize: req.body.companySize,
              industry: req.body.industry,
              overview: req.body.overview,
              values: req.body.values,
              benefits: req.body.benefits,
              website: req.body.website,
              linkedIn: req.body.linkedIn,
              facebook: req.body.facebook,
              glassdoor: req.body.glassdoor,
              crunchBase: req.body.crunchBase,
            });

            return apiResponse.successResponseWithData(
              res,
              'Profile created Successfully.',
              company
            );
          } catch (error) {
            return apiResponse.ErrorResponse(res, error.message);
          }
        } catch (error) {
          return apiResponse.ErrorResponse(res, error.message);
        }
      }
    });
  },
];

exports.update = [
  // Validate fields.
  check('companyName').exists().withMessage('Company Name is required'),
  check('companySize').exists().withMessage('Company Size is required'),
  check('industry').exists().withMessage('Industry is required'),
  // Process request after validation and sanitization.
  (req, res) => {
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
            try {
              // Find the recruiter to update
              const company = company.findByPk(req.params.id);
              if (!company) {
                return res.status(404).json({ error: 'Recruiter not found' });
              }
              // Update the recruiter
              company.update({
                companyName: req.body.companyName,
                companySize: req.body.companySize,
                industry: req.body.industry,
                overview: req.body.overview,
                values: req.body.values,
                benefits: req.body.benefits,
                website: req.body.website,
                linkedIn: req.body.linkedIn,
                facebook: req.body.facebook,
                glassdoor: req.body.glassdoor,
                crunchBase: req.body.crunchBase,
              });
              res.json({ company });
            } catch (error) {
              return apiResponse.ErrorResponse(res, error.message);
            }
          }
        } catch (error) {
          //throw error in json response with status 500.
          return apiResponse.ErrorResponse(res, error.message);
        }
      }
    });
  },
];

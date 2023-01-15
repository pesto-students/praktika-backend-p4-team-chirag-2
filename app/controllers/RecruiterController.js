const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');

const get = async (req, res) => {
  console.log('Get Request Recrutier');
  console.log(req.decoded);
  userId = req.decoded.id;
  await models.company
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
};
const create = async (req, res) => {
  // Validate fields.
  check('companyname').exists().withMessage('Company Name is required'),
    check('companysize').exists().withMessage('Company Size is required'),
    check('industry').exists().withMessage('Industry is required');
  // Process request after validation and sanitization.

  try {
    // Extract the validation errors from a request.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      // Create the recruiter
      const companyData = await models.company.create({
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
        companyData
      );
    } catch (error) {
      return apiResponse.ErrorResponse(res, error.message);
    }
  } catch (error) {
    return apiResponse.ErrorResponse(res, error.message);
  }
};

const update = async (req, res) => {
  // Validate fields.
  check('companyname').exists().withMessage('Company Name is required'),
    check('companysize').exists().withMessage('Company Size is required'),
    check('industry').exists().withMessage('Industry is required');
  // Process request after validation and sanitization.

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
        const companyData = await company.findByPk(req.params.id);
        if (!companyData) {
          return res.status(404).json({ error: 'Recruiter not found' });
        }
        // Update the recruiter
        companyData.update({
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
        res.json({ companyData });
      } catch (error) {
        return apiResponse.ErrorResponse(res, error.message);
      }
    }
  } catch (error) {
    //throw error in json response with status 500.
    return apiResponse.ErrorResponse(res, error.message);
  }
};

module.exports = { get, create, update };

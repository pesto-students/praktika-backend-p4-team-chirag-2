const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const vacancy = require('../models/vacancy');

exports.get = [
  async (req, res) => {
    // Verify the JWT token in the request header
    const token = req.header('x-access-token');
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user_id = decoded.user_id;
      // Find all vacancies of the specific company
      let vacancies = await Vacancy.findAll({
        where: { company_id: company_id },
      });
      // Filter the result based on jobCategory and jobType
      if (req.query.jobCategory) {
        vacancies = vacancies.filter(
          (vacancy) => vacancy.jobCategory === req.query.jobCategory
        );
      }
      if (req.query.jobType) {
        vacancies = vacancies.filter(
          (vacancy) => vacancy.jobType === req.query.jobType
        );
      }
      res.json({ vacancies });
    } catch (error) {
      res.status(401).json({ error: 'Invalid token' });
    }
  },
];

exports.create = [
  // Validate fields.
  check('JobTitle').not().isEmpty().withMessage('Job title is required'),
  check('JobDescription')
    .not()
    .isEmpty()
    .withMessage('Job description is required'),
  check('NumberOfVacancy')
    .not()
    .isEmpty()
    .withMessage('Number of vacancy is required'),
  check('JobCategory').not().isEmpty().withMessage('Job category is required'),
  check('JobType').not().isEmpty().withMessage('Job type is required'),
  check('Country').not().isEmpty().withMessage('Country is required'),
  check('State').not().isEmpty().withMessage('State is required'),
  check('City').not().isEmpty().withMessage('City is required'),
  check('ExperienceLevel')
    .not()
    .isEmpty()
    .withMessage('Experience level is required'),
  check('MinimumExperience')
    .not()
    .isEmpty()
    .withMessage('Minimum experience is required'),
  check('MaximumExperience')
    .not()
    .isEmpty()
    .withMessage('Maximum experience is required'),
  check('Currency').not().isEmpty().withMessage('Currency is required'),
  check('ExpectedSalaryFrom')
    .not()
    .isEmpty()
    .withMessage('Expected salary from is required'),
  check('ExpectedSalaryTo')
    .not()
    .isEmpty()
    .withMessage('Expected salary to is required'),
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
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }

          const vacancyData = vacancy.create({
            company_id: req.body.company_id,
            JobTitle: req.body.JobTitle,
            JobDescriptio: req.body.JobDescriptio,
            NumberOfVacancy: req.body.NumberOfVacancy,
            JobCategory: req.body.JobCategory,
            JobType: req.body.JobType,
            Country: req.body.Country,
            State: req.body.State,
            City: req.body.City,
            ExperienceLevel: req.body.ExperienceLevel,
            MinimumExperience: req.body.MinimumExperience,
            MaximumExperience: req.body.MaximumExperience,
            Currency: req.body.Currency,
            ExpectedSalaryFrom: req.body.ExpectedSalaryFrom,
            ExpectedSalaryTo: req.body.ExpectedSalaryTo,
          });

          return res.status(201).json({
            message: 'Vacancy created successfully',
            vacancyData,
          });
        } catch (error) {
          next(error);
        }
      }
    });
  },
];

exports.update = [
  // Validate fields.
  check('JobTitle').not().isEmpty().withMessage('Job title is required'),
  check('JobDescription')
    .not()
    .isEmpty()
    .withMessage('Job description is required'),
  check('NumberOfVacancy')
    .not()
    .isEmpty()
    .withMessage('Number of vacancy is required'),
  check('JobCategory').not().isEmpty().withMessage('Job category is required'),
  check('JobType').not().isEmpty().withMessage('Job type is required'),
  check('Country').not().isEmpty().withMessage('Country is required'),
  check('State').not().isEmpty().withMessage('State is required'),
  check('City').not().isEmpty().withMessage('City is required'),
  check('ExperienceLevel')
    .not()
    .isEmpty()
    .withMessage('Experience level is required'),
  check('MinimumExperience')
    .not()
    .isEmpty()
    .withMessage('Minimum experience is required'),
  check('MaximumExperience')
    .not()
    .isEmpty()
    .withMessage('Maximum experience is required'),
  check('Currency').not().isEmpty().withMessage('Currency is required'),
  check('ExpectedSalaryFrom')
    .not()
    .isEmpty()
    .withMessage('Expected salary from is required'),
  check('ExpectedSalaryTo')
    .not()
    .isEmpty()
    .withMessage('Expected salary to is required'),
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
          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
          }
          const vacancy = vacancy.findByPk(req.params.id);
          if (!vacancy) {
            return res.status(404).json({ error: 'vacancy not found' });
          }
          vacancy.update({
            company_id: req.body.company_id,
            JobTitle: req.body.JobTitle,
            JobDescriptio: req.body.JobDescriptio,
            NumberOfVacancy: req.body.NumberOfVacancy,
            JobCategory: req.body.JobCategory,
            JobType: req.body.JobType,
            Country: req.body.Country,
            State: req.body.State,
            City: req.body.City,
            ExperienceLevel: req.body.ExperienceLevel,
            MinimumExperience: req.body.MinimumExperience,
            MaximumExperience: req.body.MaximumExperience,
            Currency: req.body.Currency,
            ExpectedSalaryFrom: req.body.ExpectedSalaryFrom,
            ExpectedSalaryTo: req.body.ExpectedSalaryTo,
          });

          return res.status(201).json({
            message: 'Vacancy created successfully',
            vacancyData,
          });
        } catch (error) {
          next(error);
        }
      }
    });
  },
];

exports.delete = [
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
          const { id } = req.params;
          const vacancy = vacancy.findByPk(id);
          if (!vacancy) {
            return res.status(404).json({ message: 'Vacancy not found' });
          }
          vacancy.destroy();
          return res
            .status(200)
            .json({ message: 'Vacancy deleted successfully' });
        } catch (error) {
          next(error);
        }
      }
    });
  },
];

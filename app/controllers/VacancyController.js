const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const vacancy = require('../models/vacancy');

const getData = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    let vacancies = vacancy.findAll({
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
};
const create =
  // Validate fields.
  async (req, res) => {
    console.log(req.body);
    check('jobtitle').not().isEmpty().withMessage('Job title is required'),
      check('jobdescription')
        .not()
        .isEmpty()
        .withMessage('Job description is required'),
      check('numberofvacancy')
        .not()
        .isEmpty()
        .withMessage('Number of vacancy is required'),
      check('jobcategory')
        .not()
        .isEmpty()
        .withMessage('Job category is required'),
      check('jobtype').not().isEmpty().withMessage('Job type is required'),
      check('country').not().isEmpty().withMessage('country is required'),
      check('state').not().isEmpty().withMessage('state is required'),
      check('city').not().isEmpty().withMessage('city is required'),
      check('experiencelevel')
        .not()
        .isEmpty()
        .withMessage('Experience level is required'),
      check('minimumexperience')
        .not()
        .isEmpty()
        .withMessage('Minimum experience is required'),
      check('maximumexperience')
        .not()
        .isEmpty()
        .withMessage('Maximum experience is required'),
      check('currency').not().isEmpty().withMessage('currency is required'),
      check('expectedsalaryfrom')
        .not()
        .isEmpty()
        .withMessage('Expected salary from is required'),
      check('expectedsalaryto')
        .not()
        .isEmpty()
        .withMessage('Expected salary to is required');
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const vacancyData = await vacancy.create({
        company_id: req.decoded.company_id,
        jobtitle: req.body.jobtitle,
        jobdescription: req.body.jobdescription,
        numberofvacancy: req.body.numberofvacancy,
        jobcategory: req.body.jobcategory,
        jobtype: req.body.jobtype,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        experiencelevel: req.body.experiencelevel,
        minimumexperience: req.body.minimumexperience,
        maximumexperience: req.body.maximumexperience,
        currency: req.body.currency,
        expectedsalaryfrom: req.body.expectedsalaryfrom,
        expectedsalaryto: req.body.expectedsalaryto,
      });

      return res.status(201).json({
        message: 'Vacancy created successfully',
        vacancyData,
      });
    } catch (error) {
      console.log(error);
    }
  };
const update = async (req, res) => {
  // Validate fields.
  check('jobtitle').not().isEmpty().withMessage('Job title is required'),
    check('jobdescription')
      .not()
      .isEmpty()
      .withMessage('Job description is required'),
    check('numberofvacancy')
      .not()
      .isEmpty()
      .withMessage('Number of vacancy is required'),
    check('jobcategory')
      .not()
      .isEmpty()
      .withMessage('Job category is required'),
    check('jobtype').not().isEmpty().withMessage('Job type is required'),
    check('country').not().isEmpty().withMessage('country is required'),
    check('state').not().isEmpty().withMessage('state is required'),
    check('city').not().isEmpty().withMessage('city is required'),
    check('experiencelevel')
      .not()
      .isEmpty()
      .withMessage('Experience level is required'),
    check('minimumexperience')
      .not()
      .isEmpty()
      .withMessage('Minimum experience is required'),
    check('maximumexperience')
      .not()
      .isEmpty()
      .withMessage('Maximum experience is required'),
    check('currency').not().isEmpty().withMessage('currency is required'),
    check('expectedsalaryfrom')
      .not()
      .isEmpty()
      .withMessage('Expected salary from is required'),
    check('expectedsalaryto')
      .not()
      .isEmpty()
      .withMessage('Expected salary to is required');
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const vacancy = await vacancy.findByPk(req.params.id);
    if (!vacancy) {
      return res.status(404).json({ error: 'vacancy not found' });
    }
    await vacancy.update({
      company_id: req.body.company_id,
      jobtitle: req.body.jobtitle,
      jobdescription: req.body.jobdescription,
      numberofvacancy: req.body.numberofvacancy,
      jobcategory: req.body.jobcategory,
      jobtype: req.body.jobtype,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      experiencelevel: req.body.experiencelevel,
      minimumexperience: req.body.minimumexperience,
      maximumexperience: req.body.maximumexperience,
      currency: req.body.currency,
      expectedsalaryfrom: req.body.expectedsalaryfrom,
      expectedsalaryto: req.body.expectedsalaryto,
    });

    return res.status(201).json({
      message: 'Vacancy created successfully',
      vacancyData,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const vacancy = await vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    await vacancy.destroy();
    return res.status(200).json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getData, create, update, deleteData };

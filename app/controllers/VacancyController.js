const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');
const vacancy = require('../models/vacancy');

const getData = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    console.log(req);
    let vacancies = models.vacancy.findAll({
      where: { company_id: req.decoded.company_id },
    });
    console.log(vacancies);
    // Filter the result based on jobCategory and jobType
    if (req.query.jobcategory) {
      vacancies = vacancies.filter(
        (vacancy) => models.vacancy.jobCategory === req.query.jobCategory
      );
    }
    if (req.query.jobtype) {
      vacancies = vacancies.filter(
        (vacancy) => models.vacancy.jobType === req.query.jobType
      );
    }
    vacancies
      .then((vacancy) => {
        res.json(vacancy);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
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

      const vacancyData = await models.vacancy.create({
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
      return res.status(400).json({ errors: error });
    }
  };
const update = async (req, res) => {
  console.log(req.body);
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
    const vacancy = await models.vacancy.findByPk(req.body.id);
    if (!vacancy) {
      return res.status(404).json({ error: 'vacancy not found' });
    }
    await vacancy.update({
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
      message: 'Vacancy Updated successfully',
      vacancy,
    });
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.body;
    const vacancy = await models.vacancy.findByPk(id);
    if (!vacancy) {
      return res.status(404).json({ message: 'Vacancy not found' });
    }
    await vacancy.destroy();
    return res.status(200).json({ message: 'Vacancy deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

const getSkills = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    console.log(req);
    let skill = models.skills.findAll();
    skill
      .then((skills) => {
        res.json(skills);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getjobcategory = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    console.log(req);
    let job_categorys = models.job_categorys.findAll();
    job_categorys
      .then((categorys) => {
        res.json(categorys);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getData,
  create,
  update,
  deleteData,
  getSkills,
  getjobcategory,
};

const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const models = require('../models');
const getData = async (req, res) => {
  try {
    var company_id = req.decoded.company_id;
    console.log('company id:' + req.decoded.company_id);
    // Find all vacancies of the specific company
    let vacancies = models.vacancy.findAll(
      {
        where: { company_id: company_id },
      },
      {
        attributes: [
          'id',
          'company_id',
          'jobtitle',
          'jobdescription',
          'numberofvacancy',
          ['jobcategory.name', 'jobcategory'],
          ['country.name', 'country'],
          ['state.name', 'state'],
          ['city.name', 'city'],
          'experiencelevel',
          'minimumexperience',
          'maximumexperience',
          ['currency.name', 'currency'],
          ['currency.symbol', 'currency_symbol'],
          'expectedsalaryfrom',
          'expectedsalaryto',
        ],
        include: [
          {
            model: models.jobcategory,
            attributes: [],
          },
          {
            model: models.country,
            attributes: [],
          },
          {
            model: models.state,
            attributes: [],
          },
          {
            model: models.city,
            attributes: [],
          },
          {
            model: models.currency,
            attributes: [],
          },
        ],
      }
    );

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
    console.log(error);
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
      req.body.skills.forEach(async (skill) => {
        await models.vacancy_skills.create({
          vacancy_id: vacancyData.id,
          skills_id: skill,
        });
      });
      return res.status(201).json({
        message: 'Vacancy created successfully',
        vacancyData,
      });
    } catch (error) {
      return res.status(500).json({ errors: error });
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
    var vacancy_skills_data = [];
    await models.vacancy_skills
      .findAll({
        where: { vacancy_id: vacancy.id },
      })
      .then((skills) => {
        vacancy_skills_data = skills;
      });

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
    vacancy_skills_data.forEach(async (skill) => {
      await skill.destroy();
    });
    req.body.skills.forEach(async (skill) => {
      await models.vacancy_skills.create({
        vacancy_id: req.body.id,
        skills_id: skill,
      });
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

const getCountrys = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    console.log(req);
    let countrys = models.country.findAll();
    countrys
      .then((country) => {
        res.json(country);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getStates = async (req, res) => {
  try {
    // Find all vacancies of the specific company
    console.log(req.body.country_id);
    let states = models.state.findAll({
      where: { country_id: req.body.country_id },
    });
    states
      .then((state) => {
        res.json(state);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCitys = async (req, res) => {
  // Verify the JWT token in the request header
  try {
    // Find all vacancies of the specific company
    console.log(req);
    let citys = models.city.findAll({
      where: { state_id: req.body.state_id },
    });
    citys
      .then((city) => {
        res.json(city);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getCandidateListing = async (req, res) => {
  console.log(req.decoded);
  userId = req.decoded.id;
  personalInformation = models.personal_information.findAll();

  if (req.query.jobcategory) {
    personalInformation = personalInformation.filter(
      (informations) =>
        models.personal_information.job_category_id === req.query.jobCategory
    );
  }

  personalInformation
    .then((personalInformation) => {
      res.json(personalInformation);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

module.exports = {
  getCountrys,
  getStates,
  getCitys,
  getData,
  create,
  update,
  deleteData,
  getSkills,
  getjobcategory,
  getCandidateListing,
};

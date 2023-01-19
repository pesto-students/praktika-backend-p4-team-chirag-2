const apiResponse = require('../../helpers/apiResponse');
const { check, validationResult } = require('express-validator');
const models = require('../models');

const getPendingVacancy = async (req, res) => {
  try {
    // Find all vacancies of the specific company
    let vacancies = models.vacancy.findAll(
      {
        where: { company_id: req.body.company_id },
      },
      {
        order: [['numberofvacancy', 'DESC']],
      },
      { limit: 10 },
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

const getAllCount = async (req, res) => {
  numberofvacancy = 0;
  pendinginterview = 0;
  interviewtoday = 0;
  models.vacancy
    .sum('numberofvacancy')
    .then((sum) => {
      numberofvacancy = sum;
    })
    .catch((error) => {
      console.log(error);
    });

  const today = new Date();
  models.job_application
    .count({
      where: {
        interviewdate: today,
      },
    })
    .then((count) => {
      interviewtoday = count;
    })
    .catch((error) => {
      console.log(error);
    });
  models.job_application
    .count({
      where: {
        interviewdate: {
          [Op.gte]: today,
        },
      },
    })
    .then((count) => {
      pendinginterview = count;
    })
    .catch((error) => {
      console.log(error);
    });
};

const getPendingInterviews = async (req, res) => {
  try {
    // Find all vacancies of the specific company
    let vacancies = models.job_application
      .findAll({
        attributes: ['id', 'vacancy_id', 'user_id', 'interviewdate', 'status'],
        include: [
          {
            model: models.users,
            attributes: ['name'],
            required: true,
          },
          {
            model: models.vacancy,
            attributes: ['jobtitle'],
            required: true,
          },
        ],
      })
      .then((job_applications) => {
        console.log(job_applications);
      })
      .catch((error) => {
        console.log(error);
      });

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

module.exports = {
  getPendingVacancy,
  getAllCount,
  getPendingInterviews,
};

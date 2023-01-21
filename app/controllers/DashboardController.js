const apiResponse = require('../../helpers/apiResponse');
const models = require('../models');

const getPendingVacancy = async (req, res) => {
  try {
    // Find all vacancies of the specific company
    let vacancies = models.vacancy.findAll(
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
  var numberofvacancy = 0;
  var pendinginterview = 0;
  var interviewtoday = 0;
  await models.vacancy
    .sum('numberofvacancy')
    .then((sum) => {
      numberofvacancy = sum;
      console.log('number of vacancy ' + numberofvacancy);
    })
    .catch((error) => {
      console.log(error);
    });

  const today = new Date();
  await models.job_application
    .count({
      where: {
        interviewdate: today,
      },
    })
    .then((count) => {
      interviewtoday = count;
      console.log('number of interviewtoday ' + interviewtoday);
    })
    .catch((error) => {
      console.log(error);
    });
  await models.job_application
    .count({
      where: {
        interviewdate: {
          $gte: today,
        },
      },
    })
    .then((count) => {
      pendinginterview = count;
      console.log('number of pendinginterview ' + pendinginterview);
    })
    .catch((error) => {
      console.log(error);
    });
  var modelData = {
    numberofvacancyCount: numberofvacancy,
    pendinginterviewCount: pendinginterview,
    interviewtodayCount: interviewtoday,
  };
  console.log(modelData);
  res.json(modelData);
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
            attributes: ['first_name','last_name'],
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
        res.json(job_applications);
      })
      .catch((error) => {
        console.log(error);
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

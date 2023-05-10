const path = require('path');
const env = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = express.Router();
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const recrutirerRoutes = require('./routes/recrutirer');
const candidateRoutes = require('./routes/candidate');
const vacancyRoutes = require('./routes/vacancy');
const cityRoutes = require('./routes/city');
const dashboardRoutes = require('./routes/dashboard');
// const candidatelistRoutes = require('./routes/candidatelist');
const apiResponse = require('./helpers/apiResponse');

const app = express();

env.config();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//To allow cross-origin requests
app.use(cors());

app.use(dashboardRoutes);
app.use(authRoutes);
app.use(recrutirerRoutes);
app.use(candidateRoutes);
app.use(vacancyRoutes);
app.use(cityRoutes);
// app.use(candidatelistRoutes);

// throw 404 if URL not found
app.all('*', function (req, res) {
  return apiResponse.notFoundResponse(res, 'Page not found');
});

app.use((err, req, res) => {
  if (err.name == 'UnauthorizedError') {
    return apiResponse.unauthorizedResponse(res, err.message);
  }
});

app.listen(process.env.PORT);
console.log('App listening on port ' + process.env.PORT);

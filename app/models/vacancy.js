'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Company.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      company_id: {
        type: DataTypes.INTEGER,
        references: 'company',
        referencesKey: 'id',
      },
      jobTitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobDescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numberOfVacancy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobCategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobType: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      country: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      state: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      city: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      experienceLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minimumExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maximumExperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expectedSalaryFrom: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      expectedSalaryTo: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'vacancy',
    }
  );

  return Company;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vacancy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Vacancy.init(
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
      jobtitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jobdescription: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      numberofvacancy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobcategory: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jobtype: {
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
      experiencelevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      minimumexperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      maximumexperience: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      expectedsalaryfrom: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      expectedsalaryto: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'vacancy',
      tableName: 'vacancy',
      createdAt: false,
      updatedAt: false,
    }
  );

  return Vacancy;
};

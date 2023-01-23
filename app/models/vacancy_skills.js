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
      vacancy_id: {
        type: DataTypes.INTEGER,
        references: 'vacancy',
        referencesKey: 'id',
      },
      skills_id: {
        type: DataTypes.INTEGER,
        references: 'skills',
        referencesKey: 'id',
      },
    },
    {
      sequelize,
      modelName: 'vacancy_skills',
      tableName: 'vacancy_skills',
      createdAt: false,
      updatedAt: false,
    }
  );

  return Vacancy;
};

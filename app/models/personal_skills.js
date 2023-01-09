'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalSkills extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalSkills.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      personal_information_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 'personal_information',
        referencesKey: 'id',
      },
      skill_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: 'skills',
        referencesKey: 'id',
      },
    },
    {
      sequelize,
      modelName: 'personal_skills',
    }
  );

  return PersonalSkills;
};

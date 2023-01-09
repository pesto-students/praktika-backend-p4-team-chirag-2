'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PersonalInformation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of DataTypes lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PersonalInformation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: 'users',
        referencesKey: 'id',
      },
      first_name: {
        type: DataTypes.STRING,
      },
      last_name: {
        type: DataTypes.STRING,
      },
      job_category_id: {
        type: DataTypes.INTEGER,
      },
      total_expeiance: {
        type: DataTypes.DECIMAL,
      },
      currancy_id: {
        type: DataTypes.INTEGER,
      },
      current_ctc: {
        type: DataTypes.DECIMAL,
      },
      expected_ctc: {
        type: DataTypes.DECIMAL,
      },
      resume_url: {
        type: DataTypes.STRING,
      },
      video_url: {
        type: DataTypes.STRING,
      },
      website_link: {
        type: DataTypes.STRING,
      },
      linked_link: {
        type: DataTypes.STRING,
      },
      github_link: {
        type: DataTypes.STRING,
      },
      facebook_link: {
        type: DataTypes.STRING,
      },
      twitter_link: {
        type: DataTypes.STRING,
      },
      current_address_line_1: {
        type: DataTypes.STRING,
      },
      current_address_line_2: {
        type: DataTypes.STRING,
      },
      current_country_id: {
        type: DataTypes.INTEGER,
      },
      current_city_id: {
        type: DataTypes.INTEGER,
      },
      current_state_id: {
        type: DataTypes.INTEGER,
      },
      current_zip_code: {
        type: DataTypes.STRING,
      },
      permanent_address_line_1: {
        type: DataTypes.STRING,
      },
      permanent_address_line_2: {
        type: DataTypes.STRING,
      },
      permanent_country_id: {
        type: DataTypes.INTEGER,
      },
      permanent_city_id: {
        type: DataTypes.INTEGER,
      },
      permanent_state_id: {
        type: DataTypes.INTEGER,
      },
      permanent_zip_code: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'personal_information',
    }
  );

  return PersonalInformation;
};

'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args: true,
          msg: 'Email address already in use!',
        },
        validate: {
          isEmail: {
            msg: 'Please enter a valid email',
          },
        },
      },
      mobile_no: DataTypes.STRING,
      role_id: {
        type: DataTypes.INTEGER,
        references: 'roles',
        referencesKey: 'id',
      },
      hashedPassword: {
        type: DataTypes.STRING(64),
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );

  return User;
};

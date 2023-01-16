'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class State extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  State.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country_id: {
        type: DataTypes.INTEGER,
        references: 'country',
        referencesKey: 'id',
      },
    },
    {
      sequelize,
      modelName: 'state',
      tableName: 'state',
      createdAt: false,
      updatedAt: false,
    }
  );
  return State;
};

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class JobApplcation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      JobApplcation.belongsTo(models.users, {foreignKey: 'user_id'});
      JobApplcation.belongsTo(models.vacancy, {foreignKey: 'vacancy_id'});
    }
  }
  JobApplcation.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      vacancy_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'vacancy',
          key: 'id',
        },
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      interviewdate: {
        type: DataTypes.DATE,
      },
      status: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: 'job_application',
      tableName: 'job_application',
      createdAt: false,
      updatedAt: false,
    }
  );
  return JobApplcation;
};

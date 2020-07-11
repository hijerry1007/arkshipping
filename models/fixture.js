'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fixture extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Fixture.init({
    ChartererId: DataTypes.INTEGER,
    VesselId: DataTypes.INTEGER,
    minPeriod: DataTypes.STRING,
    maxPeriod: DataTypes.STRING,
    hire: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fixture',
  });
  return Fixture;
};
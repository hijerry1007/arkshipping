'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Charterer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Charterer.belongsToMany(models.Vessel, {
        through: models.Fixture,
        foreignKey: 'ChartererId',
        as: 'CharteredVessels'
      })
    }
  };
  Charterer.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Charterer',
  });
  return Charterer;
};
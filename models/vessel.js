'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vessel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vessel.init({
    name: DataTypes.STRING,
    IMONumber: DataTypes.STRING,
    blt: DataTypes.STRING,
    type: DataTypes.STRING,
    teu: DataTypes.STRING,
    homo: DataTypes.STRING,
    reefer: DataTypes.STRING,
    dwt: DataTypes.STRING,
    draft: DataTypes.STRING,
    gear: DataTypes.STRING,
    loa: DataTypes.STRING,
    beam: DataTypes.STRING,
    spdcon: DataTypes.STRING,
    place: DataTypes.STRING,
    opendate: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Vessel',
  });
  return Vessel;
};
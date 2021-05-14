const { DataTypes } = require("sequelize");
const db = require("../db");

const Plant = db.define("plant", {
  commonPlantName: {
    type: DataTypes.STRING(85),
    allowNull: false,
    unique: true,
  },
  scientificPlantName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  growthZone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  img: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img3: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  water: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  soil: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  sun: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  indoor: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }, 
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }, 
  description: {
    type: DataTypes.TEXT(1000),
    allowNull: false
  }, 
});

module.exports = Plant;
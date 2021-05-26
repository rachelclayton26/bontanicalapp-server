const {DataTypes} = require("sequelize");
const db = require("../db");

const Fav = db.define("fav", {
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    plantId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Fav;

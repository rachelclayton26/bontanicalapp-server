const Sequelize = require('sequelize');

const dbConnection = new Sequelize(process.env.DATABASE_URL, { 
    dialect: 'postgres',
    ssl: process.env.ENVIRONMENT === 'development'
});

module.exports = dbConnection;
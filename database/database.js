const Sequelize = require('sequelize')

const connection = new Sequelize('controleMercado', 'root', 'root123', {
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
})

module.exports = connection
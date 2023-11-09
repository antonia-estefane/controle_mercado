const Sequelize = require('sequelize')
const connection = require('../database/database')

const Category = connection.define('categorias', {
  nome: {
    type: Sequelize.STRING,
    allowNull: false
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

// connection.sync({force: true})


module.exports = Category

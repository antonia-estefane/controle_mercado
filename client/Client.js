const Sequelize = require('sequelize')
const connection = require('../database/database')

const Client = connection.define('clientes', {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
    }
       
});

// Client.sync({force: false})

module.exports = Client
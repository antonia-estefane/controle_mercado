const Sequelize = require('sequelize')
const connection = require('../database/database')

const Product = connection.define('produtos', {
    nome_produto: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco_venda: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    preco_custo: {
        type: Sequelize.FLOAT,
        allowNull: false
    }, 
    qtd_estoque: {
        type: Sequelize.INTEGER,
        allowNull: false
    }, 
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    fornecedor: {
        type: Sequelize.STRING,
        allowNull: false
    }
       
});

module.exports = Product
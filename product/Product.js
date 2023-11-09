const Sequelize = require('sequelize')
const connection = require('../database/database')
const Category = require('../categories/Category')


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
    fornecedor: {
        type: Sequelize.STRING,
        allowNull: false
    },
    foto: {
        type: Sequelize.TEXT('medium'),
        allowNull: false
    }
       
});

Category.hasMany(Product) 
Product.belongsTo(Category) 

module.exports = Product
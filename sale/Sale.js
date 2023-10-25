const Sequelize = require('sequelize')
const connection = require('../database/database')
const Client = require('../client/Client')

const Sale = connection.define('vendas', {
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco_venda: {
        type: Sequelize.FLOAT,
        allowNull: false
    }, 
    data: {
        type: Sequelize.DATE,
        allowNull: false
    }
       
});

Client.hasMany(Sale)
Sale.belongsTo(Client, {foreignKey: 'clienteId' })


module.exports = Sale
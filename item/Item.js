const Sequelize = require('sequelize')
const connection = require('../database/database')
const Product = require('../product/Product')
const Sale = require('../sale/Sale')

const Item = connection.define('Item', {
  quantity: Sequelize.INTEGER
});

Product.hasMany(Item, { foreignKey: 'productId' });
Item.belongsTo(Product, { foreignKey: 'productId' });

Sale.hasMany(Item, { foreignKey: 'saleId' });
Item.belongsTo(Sale, { foreignKey: 'saleId' });

// Item.sync({force: false})

module.exports = Item;

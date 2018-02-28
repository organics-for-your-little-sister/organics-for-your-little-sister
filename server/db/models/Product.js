const db = require('../db');
const Sequelize = require('sequelize');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  category: {
    type: Sequelize.ENUM(Sequelize.STRING),
    values: ['cotton based', 'animal fiber based', 'luxury', 'no applicator']
  }
})

module.exports = Product

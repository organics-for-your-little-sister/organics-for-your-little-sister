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
    type: Sequelize.FLOAT, // do not use float for the price but integer 9.99 -> 999cents  
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0 /// min = 0; could go lower than 0; 
  },
  category: {
    type: Sequelize.ENUM(Sequelize.STRING),
    values: ['cotton based', 'animal fiber based', 'luxury', 'no applicator']
  }
})

//better to make a virtual here for the price. 


module.exports = Product

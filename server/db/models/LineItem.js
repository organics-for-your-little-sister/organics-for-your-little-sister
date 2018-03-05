const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./Product');

const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  }
})

LineItem.hook('beforeValidate', (lineItem) => {
  return Product.findOne({where: {id: lineItem.productId }})
    .then( product => {
      lineItem.title = product.title;
      lineItem.image = product.image;
      lineItem.price = product.price;
      lineItem.subtotal = lineitem.price * lineitem.quantity;
    })
})


module.exports = LineItem

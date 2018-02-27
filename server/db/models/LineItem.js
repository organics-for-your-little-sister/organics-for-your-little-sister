const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./Product');


const LineItem = db.define('lineitem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  price: {
    type: Sequelize.FLOAT,
  }
})

LineItem.hook('beforeValidate', (lineItem) => {
  return Product.findOne({where: {id: lineItem.productId }})
    .then( theProduct => {
      lineItem.price = theProduct.price * lineItem.quantity
    })
})

LineItem.belongsTo(Product); // ---> we get productId;
// getProduct setProduct
//LineItem.belongsTo(Order); // ---> we get orderId;


module.exports = LineItem

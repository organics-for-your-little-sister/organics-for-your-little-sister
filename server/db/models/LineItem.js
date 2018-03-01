const db = require('../db');
const Sequelize = require('sequelize');
const Product = require('./Product');

<<<<<<< HEAD


=======
>>>>>>> 63935b1e5580b57cec12c2dcab053a008fd1cd4c
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
    .then( theProduct => {
      lineItem.price = theProduct.price * lineItem.quantity
    })
})


module.exports = LineItem

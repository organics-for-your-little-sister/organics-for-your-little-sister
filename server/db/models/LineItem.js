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
},)

// LineItem.prototype.getPrice = function(product){
//   return Product.findOne({ where: { id: this.productId }})
//     .then( theProduct => {
//       return theProduct.price * this.quantity
//     })
// }

LineItem.hook('beforeValidate', (product)=>{
  return Product.findOne({where: {id: product.id }})
    .then( theProduct => {
      return theProduct.price * this.quantity
    })
})

LineItem.belongsTo(Product); // ---> we get productId;
// getProduct setProduct
//LineItem.belongsTo(Order); // ---> we get orderId;


module.exports = LineItem

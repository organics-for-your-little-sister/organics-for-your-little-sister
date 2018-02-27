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
    allowNull: false
  }
}
)

LineItem.belongsTo(Product); // ---> we get productId;
//LineItem.belongsTo(Order); // ---> we get orderId;

LineItem.hook = ('beforeSave', function(lineitem) {
    LineItem.findOne({ where: { productId: Product.id }, include: { model: Product }})
     .then( product => {
        lineitem.price = product.price * lineitem.quantity
     })
})


LineItem.prototype.getPrice = function(product){
  return this.findOne({ where: { productId: product.id}})
    .then( theProduct => {

    })
}


module.exports = LineItem

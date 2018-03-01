const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./LineItem')


const Order = db.define('order',{
    
    orderStatus: {
        type: Sequelize.ENUM(Sequelize.STRING),
        values: ['cart','orderComplete','shipped']
      },
    totalOrderPrice: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    totalOrderQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})
Order.hook('beforeValidate',(order) =>{
    return LineItem.findAll({
        where: {
            orderId: order.id
        }
    })
    .then(lineItems => {
        order.totalOrderPrice = lineItems.reduce((accu,lineItem) => {
           return accu + lineItem.price;
        },0)
     order.totalOrderQuantity = lineItems.reduce((accu,lineItem) => {
         return accu + lineItem.quantity;
        },0)     
    })
})



module.exports = Order;
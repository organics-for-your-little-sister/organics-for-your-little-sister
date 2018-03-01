const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./LineItem')

const Order = db.define('order',{
    
    orderStatus: {
        type: Sequelize.STRING,
        
    },
    totalOrderPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalOrderQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
// Order.hook('beforeValidate',(order) =>{
    
// })

module.exports = Order
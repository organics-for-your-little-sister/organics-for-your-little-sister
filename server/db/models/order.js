const Sequelize = require('sequelize')
const db = require('../db')
const LineItem = require('./LineItem')

const Order = db.define('order', {

    orderStatus: {
        type: Sequelize.ENUM(Sequelize.STRING),
        values: ['cart', 'submitted', 'shipped']
    },
    totalOrderPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalOrderQuantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Order.hook('beforeValidate', (order) => {
    return LineItem.findAll({
        where: {
            orderId: order.id
        }
    })
    .then(lineItems => {
        lineItems.reduce((accum, currVal) => {
            return accum + currVal
        })
    })
})

module.exports = Order

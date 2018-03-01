const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
    productName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    unitPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantityInStock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    orderPlacedDate: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    shippingAddress: {
        type: Sequelize.STRING,
        allowNull: false
    }
})














module.exports = Order
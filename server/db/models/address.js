const Sequelize = require('sequelize')
const db = require('../db')


const Address = db.define('address', {
  mailingAddressStreet: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mailingAddressCity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mailingAddressState: {
    type: Sequelize.STRING,
    allowNull: false
  },
  mailingAddressZipCode: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Address;

const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const date = new Date();

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  paymentInfoCardNumber: { // connected to paypal or stripe
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isCreditCard: true
    }// test this part again
  },
  // paymentInfoName: {
  //   type: Sequelize.STRING,
  //   allowNull: false,
  // },
  // paymentInfoMonth: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     min: 1,
  //     max: 12
  //   }
  // },
  // paymentInfoYear: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  //   validate: {
  //     min: date.getFullYear(),
  //     max: date.getFullYear() + 5
  //   }
  // },
  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },
  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get () {
      return () => this.getDataValue('salt')
    }
  },
  googleId: {
    type: Sequelize.STRING
  },

  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  isLoggedIn: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }

})

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt()) === this.password()
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)

const db = require('../db');
const Sequelize = require('sequelize');
const Review = require('./Review');

const Product = db.define('product', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  inventoryQuantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  category: {
    type: Sequelize.ENUM(Sequelize.STRING),
    values: ['cotton based', 'animal fiber based', 'luxury', 'no applicator']
  },
  avgRating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  }
})

Product.prototype.priceCalc = function() {
  this.price = this.price / 10
  return this.price;
}

Product.prototype.ratingCalc = function() {
  return Review.findAll({
    where: {
      productId: this.id
    }
  })
  .then(reviews => {
    console.log(reviews)
    if (reviews.length) {
      this.avgRating = reviews.reduce((accum, currentVal) => {
        return accum + currentVal
      }) / reviews.length;
      return this.avgRating
    }
  })
}

//can you use an instance method inside an setter method?
//how do you actually utilize an instance method?

module.exports = Product


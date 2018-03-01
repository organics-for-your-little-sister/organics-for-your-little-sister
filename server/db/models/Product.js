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
    allowNull: false,
    set(val) {
      this.setDataValue('price', val / 10)
    }
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
    type: Sequelize.INTEGER
  }
})

Product.prototype.ratingCalc = function() {
  Review.findAll({
    where: {
      productId: this.id
    }
  })
  .then(allReviews => {
    if (allReviews.length) {
      const allRatings = allReviews.map(review => review.rating);
      this.avgRating = allRatings.reduce((accum, currentVal) => {
        return accum + currentVal
        }) / allReviews.length;
      return this.avgRating;
    }
  })
}

module.exports = Product


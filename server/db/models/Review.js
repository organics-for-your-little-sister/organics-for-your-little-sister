const db = require('../db');
const Sequelize = require('sequelize');

const Review = db.define('review', {
  reviewText: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      len: {
        args: 2,
        msg: 'Review must be at least 2 characters in length.'
      }
    }
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  }
})

module.exports = Review;

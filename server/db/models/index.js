const db = require('../db');
const User = require('./user');
const Product = require('./Product');
const Review = require('./Review');
const LineItem = require('./LineItem');
const Address = require('./Address');
const Order = require('./order');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
LineItem.belongsTo(Product);
Review.belongsTo(Product);
Product.hasMany(Review);
Address.belongsTo(User);
User.hasMany(Address);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);
User.hasMany(Order);
Order.belongsTo(User);
Review.belongsTo(User);
User.hasMany(Review);
/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Product, Review, LineItem, Address, Order, db
}

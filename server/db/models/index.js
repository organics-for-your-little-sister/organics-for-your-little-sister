const User = require('./user');
const Product = require('./Product');
const Review = require('./Review');
const LineItem = require('./LineItem');
const Order = require('./Order');
//const Address = require('./Address');
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */
LineItem.belongsTo(Product);
Review.belongsTo(Product);
Review.belongsTo(User);
Product.hasMany(Review);
LineItem.belongsTo(Order);
Order.hasMany(LineItem);
Order.belongsTo(User);
User.hasMany(Order);
// User.hasMany(Address);
// Address.belongsTo(User);


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User, Product, Review, LineItem, Order
}

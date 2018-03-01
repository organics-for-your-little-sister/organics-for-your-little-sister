'use strict';

const db = require('./server/db');
const User = require('./server/db/models/user');
const LineItem = require('./server/db/models/LineItem');
// const Order = require('./server/db/models/order');
const Product = require('./server/db/models/Product');
const Review = require('./server/db/models/Review');
//const Address = require('./server/db/models/address');

const users = [{
  firstName: 'Jasmine',
  lastName: 'J',
  email: 'jasmine@j.com',
}, {
  firstName: 'Joleene',
  lastName: 'M',
  email: 'joleene@m.com',
}, {
  firstName: 'Jennifer',
  lastName: 'K',
  email: 'jennifer@k.com',
}]

const products = [{
  title: 'organic cotton dream',
  description: 'a great tampon',
  price: 100,
  inventoryQuantity: 100,
  category: 'cotton based',
  avgRating: 3
}, {
  title: 'woolen goddess tampax',
  description: 'organic wool from New Zealand sheep. Guaranteed to prevent leaks',
  price: 150,
  inventoryQuantity: 150,
  category: 'animal fiber based',
  avgRating: 5
}, {
  title: 'Tampax Silk',
  description: 'Real Silk for All Women',
  price: 200,
  inventoryQuantity: 50,
  category: 'luxury',
  avgRating: 2
}]

const lineItems = [{
  quantity: 2,
  productId: 1
}, {
  quantity: 6,
  productId: 1
}, {
  quantity: 1,
  productId: 2
}]


const reviews = [{
  reviewText: 'This tampon sux',
  rating: 1,
  productId: 3,
  userId: 1
}, {
  reviewText: 'Yay! Great Tampon! No Leaks',
  rating: 5,
  productId: 2,
  userId: 2
}, {
  reviewText: 'it\'s fine',
  rating: 3,
  productId: 1,
  userId: 3
}]

const seed = () =>
  Promise.all(users.map(user => User.create(user)))
  .then(() =>
    Promise.all(products.map(product => Product.create(product)))
    )
  .then(() =>
    Promise.all(lineItems.map(lineItem => LineItem.create(lineItem)))
    )
  .then(() =>
    Promise.all(reviews.map(review => Review.create(review)))
    );

const main = () => {
  console.log('Syncing the db');
  db.sync({ force: true })
  .then(() => {
    console.log('Seeding the db');
    return seed();
  })
  .catch(err => {
    console.log('Error while seeding');
    console.log(err);
  })
  .then(() => {
    db.close();
    return null;
  });
};
main();

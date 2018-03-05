'use strict';

const db = require('./server/db');
const User = db.models.user
const LineItem = db.models.lineitem
const Order = db.models.order
const Product = db.models.product
const Address = db.models.address
const Review = db.models.review


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
  isAdmin: true,
  password: '123'
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

const orders = [{
  orderStatus: 'cart',
  userId: 1,
  totalOrderQuantity: 3,
  totalOrderPrice: 15
  
}, {
  orderStatus: 'cart',
  userId: 2,
  totalOrderQuantity: 1,
  totalOrderPrice: 5
  
}, {
  orderStatus: 'cart',
  userId: 1,
  totalOrderQuantity: 5,
  totalOrderPrice: 25
  
}]

const lineItems = [{
  quantity: 2,
  productId: 1,
  orderId: 1,
}, {
  quantity: 6,
  productId: 1,
  orderId: 2,
}, {
  quantity: 1,
  productId: 2,
  orderId: 1
}]

const addresses = [{
  mailingAddressStreet: '201 Great Ln',
  mailingAddressCity: 'GreatTown',
  mailingAddressState: 'GT',
  mailingAddressZipCode: '11112',
  userId: 1
}, {
  mailingAddressStreet: '123 Howdy St',
  mailingAddressCity: 'Howdyville',
  mailingAddressState: 'HV',
  mailingAddressZipCode: '11123',
  userId: 2
}, {
  mailingAddressStreet: '18 Tampax ln',
  mailingAddressCity: 'Tampax',
  mailingAddressState: 'TX',
  mailingAddressZipCode: '88818',
  userId: 3
}]

const seed = () =>
  Promise.all(users.map(user => User.create(user)))
  .then(() =>
    Promise.all(products.map(product => Product.create(product)))
    )
  .then(() =>
    Promise.all(orders.map(order => Order.create(order)))
    )
  .then(() =>
    Promise.all(lineItems.map(lineItem => LineItem.create(lineItem)))
    )
  .then(() =>
    Promise.all(reviews.map(review => Review.create(review)))
    )
  .then(() =>
    Promise.all(addresses.map(address => Address.create(address)))
    )

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

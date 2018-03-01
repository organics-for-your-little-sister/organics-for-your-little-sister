const { expect } = require('chai');
const db = require('../index');
const Order = db.model('order');
const LineItem = db.model('lineitem');

describe('Order model', () => {
  beforeEach( () => {
    return db.sync({force: true})
  })

  describe('Order hook', () => {
    describe('using hook to calculate the total price and total quantity of the order', () => {
      let newOrder;

      let theLineItem1;
      let theLineItem2;
      let theLineItem3;

      let tampon1;
      let tampon2;
      let tampon3;

      beforeEach( () => {
        return Order.create({
          orderStatus: 'cart',
          lineItemId1: 1,
          lineItemId2: 2,
          lineItemId3: 3
      })
      .then( order => {
          newOrder = order 
        })
    })

      beforeEach( () => {
        return LineItem.create({
          quantity: 2,
          productId: tampon.id})
            .then( created => {
              theLineItem1 = created
            })

      })
      beforeEach( () => {
        return Product.create({
          title: 'Fine Silk',
          description: 'Amazing silk for your little sister',
          price: 10,
          inventoryQuantity: 100,
          category: 'luxury'})
            .then( product => {
              tampon = product
            })
      })

      it('returns total price of the product based on the quantity', () => {
        expect(theLineItem.price).to.be.equal(20);
      })
    })
  })
})
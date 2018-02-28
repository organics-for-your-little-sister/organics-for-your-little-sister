const { expect } = require('chai');
const db = require('../index');
const LineItem = db.model('lineitem');
const Product = db.model('product');

describe('LineItem model', () => {
  beforeEach( () => {
    return db.sync({force: true})
  })

  describe('LineItem hook', () => {
    describe('using hook to set the price', () => {
      let tampon;
      let theLineItem

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

      beforeEach( () => {
        return LineItem.create({
          quantity: 2,
          productId: tampon.id})
            .then( created => {
              theLineItem = created
            })

      })

      it('returns total price of the product based on the quantity', () => {
        expect(theLineItem.price).to.be.equal(20);
      })
    })
  })
})


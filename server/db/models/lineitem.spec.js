const { expect } = require('chai');
const db = require('../index');
const LineItem = db.model('lineitem');
const Product = db.model('product');

describe('LineItem model', () => {
  beforeEach( () => {
    return db.sync({force: true})
  })

  describe('LineItem beforeValidate hook', () => {
    let tampon;
    let theLineItem

    beforeEach( () => {
      //make a product
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
    //make a line item
    let newItem;
    beforeEach( () => {
       newItem = LineItem.build({
        quantity: 2,
        productId: tampon.id})
       return newItem.save()
          .then( created => {
            theLineItem = created
      })
    })

    describe('addingPrice', () => {
      it('returns total price of the product based on the quantity', () => {
        expect(theLineItem.price).to.be.equal(20);
      })
    })
  })
})


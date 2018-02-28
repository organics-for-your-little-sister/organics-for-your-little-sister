const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');

describe('Product model', () => {
  beforeEach( () => {
    return db.sync({force: true})
  })

  let descriptionText = 'This tampon is absorbant and soft. You can trust that it will prevent leaks on even your highest flow days all while ensuring your comfort. No animals were harmed in the creation of this luxurious organiz angora tampon.'

  let tampon;
  beforeEach(() => {
    tampon = Product.build({
      title: 'luxury angora super tampon',
      description: descriptionText,
      price: 15,
      inventoryQuantity: 12,
      category: 'luxury'

    })
  })
  describe('attributes definition', () => {
    it('includes `title`, `description`, `price`, `inventoryQuantity`, and `category` fields', () => {
      return tampon.save()
        .then(savedProduct => {
          expect(savedProduct.title).to.equal('luxury angora super tampon');
          expect(savedProduct.description).to.equal(descriptionText);
          expect(savedProduct.price).to.equal(15);
          expect(savedProduct.inventoryQuantity).to.equal(12);
          expect(savedProduct.category).to.equal('luxury');
        })
    })

    it('requires title and price', () => {
      tampon.title = null;
      tampon.price = null;

      return tampon.validate()
      .then(() => {
        throw new Error('validation should fail when title or price is null');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
      });
    });

//   it('only accept particular values for the category', () => {
//     tampon.category = 'super duper luxury tampon';
//     return tampon.validate()
//     .then(() => {
//       throw new Error('validation should fail when any option other than cotton based, animal fiber based, luxury, or no applicator is set to a product category');
//     },
//       (result) => {
//         expect(result).to.be.an.instanceOf(Error);
//       })
//     })
   })
})

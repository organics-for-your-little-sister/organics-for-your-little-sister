const { expect } = require('chai');
const db = require('../index');
const Product = db.model('product');
const Review = db.model('review');

describe('Product model', () => {
  beforeEach( () => {
    return db.sync({force: true})
  })

  let descriptionText = 'This tampon is absorbant and soft. You can trust that it will prevent leaks on even your highest flow days all while ensuring your comfort. No animals were harmed in the creation of this luxurious organiz angora tampon.'

  let tampon;
  let review;
  let review2;
  beforeEach(() => {
    tampon = Product.build({
      title: 'luxury angora super tampon',
      description: descriptionText,
      price: 150,
      inventoryQuantity: 12,
      category: 'luxury',

    })
    review = Review.create({
      reviewText: 'this tampon rocks',
      rating: 5
    })
    review2 = Review.create({
      reviewText: 'worst tampon ever',
      rating: 1
    })
  })
  describe('attributes definition', () => {
    it('includes `title`, `description`, `price`, `inventoryQuantity`, and `category` fields', () => {
      return tampon.save()
        .then(savedProduct => {
          expect(savedProduct.title).to.equal('luxury angora super tampon');
          expect(savedProduct.description).to.equal(descriptionText);
          expect(savedProduct.price).to.equal(150);
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

  describe('priceCalc instance method', () => {

    it('when invoked, returns the price in the database divided by 10 so the number appears correctly', () => {
      return tampon.save()
        .then(savedProduct => {
          expect(savedProduct.price).to.equal(150)
          savedProduct.priceCalc();
          expect(savedProduct.price).to.equal(15)
        });

    })
  })

  describe('ratingCalc instance method', () => {

    it('when invoked, returns the average review rating', () => {
      return tampon.save()
        .then(savedProduct => {
          expect(savedProduct.avgRating).to.equal(3);
          savedProduct.ratingCalc();
          console.log(savedProduct.avgRating)
          expect(savedProduct.avgRating).to.equal(3)
        })
    })
  })
})

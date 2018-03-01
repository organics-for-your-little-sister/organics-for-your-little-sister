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
  let review1;
  let review2;
  beforeEach(() => {
    return Product.create({
      title: 'luxury angora super tampon',
      description: descriptionText,
      price: 150,
      inventoryQuantity: 12,
      category: 'luxury',
      id: 1

    })
    .then(product => {
      tampon = product
    })
    .then(() => {
      return Review.create({
        reviewText: 'this tampon rocks',
        rating: 5,
        productId: tampon.id
      })
    })
    .then(review => {review1 = review})
    .then(() => {
      return Review.create({
      reviewText: 'worst tampon ever',
      rating: 1,
      productId: tampon.id
      })
    })
    .then(review => {review2 = review})
  })

  // beforeEach(() => {
  //   return Review.create({
  //     reviewText: 'this tampon rocks',
  //     rating: 5,
  //     productId: tampon.id
  //   })
  //     .then(review => {review1 = review})
  // })

  // beforeEach(() => {
  //   return Review.create({
  //     reviewText: 'worst tampon ever',
  //     rating: 1,
  //     productId: tampon.id
  //   })
  //     .then(review => {review2 = review})
  // })

  // afterEach(() => {
  //   return Promise.all([
  //     Product.destroy(tampon)
  //   ])
  // })

  describe('attributes definition', () => {
    it('includes `title`, `description`, `price`, `inventoryQuantity`, and `category` fields', () => {
      expect(tampon.title).to.equal('luxury angora super tampon');
      expect(tampon.description).to.equal(descriptionText);
      expect(tampon.price).to.equal(15);
      expect(tampon.inventoryQuantity).to.equal(12);
      expect(tampon.category).to.equal('luxury');
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


  describe('ratingCalc instance method', () => {

    it('when invoked, returns the average review rating', () => {
      tampon.ratingCalc();
      expect(tampon.avgRating).to.equal(3);
    })
  })
})

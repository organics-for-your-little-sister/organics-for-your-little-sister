const { expect } = require('chai');
const db = require('../index');
const Review = db.model('review');

describe('Review model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  let newReview;
  beforeEach(() => {
    newReview = Review.build({
      reviewText: 'best tampon ever',
      rating: 5
    })
  })

  describe('attributes definition', () => {
    it('includes review `reviewText` and `rating` fields', () => {
      return newReview.save()
      .then(savedReview => {
        expect(savedReview.reviewText).to.equal('best tampon ever');
        expect(savedReview.rating).to.equal(5);
      })
    })
    it('requires reviewText length of at least 2', () => {
      newReview.reviewText = '?'
      return newReview.validate()
      .then(() => {
        throw new Error('validation should fail when review text is shorter than 1 caracter');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
      })
    })
    it('will not accept a rating greater than 5', () => {
      newReview.rating = 10
      return newReview.validate()
      .then(() => {
        throw new Error('validation shoudl fail when review raiting is greater than 5');
      },
      (result) => {
        expect(result).to.be.an.instanceOf(Error);
      })
    })
  })
})

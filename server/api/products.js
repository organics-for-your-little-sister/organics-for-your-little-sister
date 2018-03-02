const router = require('express').Router();
const { Product, Review } = require('../db/models');
const { isAdmin } = require('../../utilities');
module.exports = router;

router.get('/', (req, res, next) => {
  Product.findAll()
    .then( products => res.json(products))
    .catch(next);
})

router.get('/:id', (req, res, next) => {
  Product.findById(req.params.id, {
    include: [{model: Review}]
  })
    .then( product => res.json(product))
    .catch(next)
})


router.get('/category/:category', (req, res, next) => {
  Product.findAll({
    where: {
      category: req.params.category
    }
  })
  .then(products => {
    res.json(products);
  })
  .catch(next)
})

router.get('/:productId/reviews/:reviewId', (req, res, next) => {
 Review.findById({ where: { productId: req.params.productId }})
   .then( reviews => {
     const theReview = reviews.filter( aReview => aReview.id === req.params.reviewId )
     res.json(theReview)
   })
   .catch(next)

})

router.post('/', isAdmin, (req, res, next) => {
  Product.create(req.body)
    .then(product => {
      res.status(204).json(product)
    })
    .catch(next)
})

router.put('/:id', isAdmin, (req, res, next) => {
  Product.update(req.body, { where: { id: req.params.id}, returning: true })
    .then(([num, updated]) => res.json(updated[0]))
    .catch(next)
})

router.delete('/:id', isAdmin, (req, res, next) => {
  Product.destroy({ where: { id: req.params.id }})
    .then(() => res.sendStatus(204))
    .catch(next)
})
const router = require('express').Router();
const { Review } = require('../db/models');
module.exports = router;

// see all reviews
router.get('/', (req, res, next)=>{
  Review.findAll()
    .then( reviews => res.json(reviews))
    .catch(next)
})
// see all reviews by userId
router.get('/users/:id', (req, res, next)=>{
  Review.findById({ where: { userId: req.params.id }})
    .then( reviewsByUser => res.json(reviewsByUser))
    .catch(next)
})
// see all reviews by productId
router.get('/products/:id', (req, res, next)=>{
  Review.findById({ where: { productId: req.params.id}})
    .then( reviewsByProduct => res.json(reviewsByProduct))
    .catch(next)
})

router.post('/', (req, res, next)=>{
  Review.create(req.body)
    .then() /// how to add productId and reviewId
})

router.put('/:id', (req, res, next)=>{
  Review.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(([num, updated])=> res.json(updated[0]))
    .catch(next)
})

router.delete('/:id', (req, res, next)=>{
  Review.destory({where: {id: req.params.id}})
    .then( ()=> res.sendStatus(204))
    .catch(next)
})

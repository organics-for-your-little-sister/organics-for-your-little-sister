const router = require('express').Router();
const { Review } = require('../db/models');
const { isLoggedIn, makeError, isAdmin } = require('../../utilities');
module.exports = router;

// see all reviews
router.get('/', (req, res, next) => {
  Review.findAll()
    .then( reviews => res.json(reviews))
    .catch(next)
})

router.get('/:id', (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => res.json(review))
    .catch(next)
})

router.post('/', isLoggedIn, (req, res, next) => {
  Review.create(req.body)
    .then( review => res.status(201).json(review))
    .catch(next)
})

router.put('/:id', isLoggedIn, (req, res, next) => {
  if(req.user.id === req.params.id || req.user.isAdmin === true ){
    Review.update(req.body, { where: { id: req.params.id }, returning: true })
    .then(([num, updated]) => res.json(updated[0]))
    .catch(next)
  } else {
    return next(makeError(403, 'You cannot update other member\'s reviews'))    
  }
})

router.delete('/:id', isLoggedIn, (req, res, next) => {
  if(req.user.id === req.params.id || req.user.isAdmin === true ){
    Review.destroy({where: {id: req.params.id}})
    .then( () => res.sendStatus(204))
    .catch(next)
  } else {
    return next(makeError(403, 'You cannot delete other member\'s reviews'))
  }
  
})

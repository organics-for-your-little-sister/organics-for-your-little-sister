const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router


router.get('/', (req, res, next) => {
  Product.findAll({})
  .then(products => res.json(products))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(product => {
    res.json(product)
  })
  .catch(next);
})

router.get('/category/:category', (req, res, next) => {
  console.log('category params: ', req.params)
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

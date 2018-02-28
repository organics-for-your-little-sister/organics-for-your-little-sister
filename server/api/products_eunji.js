const router = require('express').Router();
const { Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next)=>{
  Product.findAll()
    .then( products => res.json(products))
    .catch(next);
})

router.get('/:id', (req, res, next)=>{
  Product.findById(req.params.id)
    .then( product => res.json(product))
    .catch(next)
})


router.get('/:categoryName', (req, res, next)=>{
  Product.findAll({ where: { category: req.params.categoryName}})
    .then( products => res.json(products))
    .catch(next);
})

router.post('/', (req, res, next)=>{
  Product.create(req.body)
    .then(product => {
      res.status(204).json(product)
    })
    .catch(next)
})

router.put('/:id', (req, res, next)=>{
  Product.update(req.body, { where: { id: req.params.id}, returning: true })
    .then(([num, updated]) => res.json(updated[0]))
    .catch(next)
})

router.delete('/:id', (req, res, next)=>{
  Product.destroy({ where: { id: req.params.id }})
    .then(()=> res.sendStatus(204))
    .catch(next)
})

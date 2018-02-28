const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

const searchFunc = (needle, haystack) => {
  for (let hIdx = 0; hIdx <= haystack.length - needle.length; hIdx++) {
    for (let nIdx = 0; nIdx < needle.length; nIdx++) {
      if (haystack[hIdx + nIdx] !== needle[nIdx]) break;
      if (nIdx + 1 === needle.length) return hIdx;
    }
  }
  return -1;
}

router.param('id', (req, res, next, id) => {
  Product.findbyId(id, (req.params.id))
  .then(product => {
    if (!product || product.inventoryQuantity === 0) {
      const err = Error('Product not currently available');
      err.status = 404
      throw err
    }
    req.product = product;
    next();
    return null;
  })
})

router.get('/', (req, res, next) => {
  Product.findAll({})
  .then(products => res.json(products))
  .catch(next);
})

router.get('/:id', (req, res, next) => {
  res.json(req.product)
  .catch(next);
})

router.get('/search/:name', (req, res, next) => {
  if (req.query) {
    Product.findAll({
      where: {
        name: req.params.name || searchFunc(req.params.name, Product.name)
      }
    })
    .then(products => {
      if (!products) {
        const err = Error('No items currently match your search. please try again');
        err.status(404)
        throw err
      } else {
      res.json(products);
      }
    })
    .catch(next);
  }
})

router.get('/:category', (req, res, next) => {
  Product.findAll({
    where: {
      category: req.params.category
    }
  })
  .then(products => {
    res.json(products);
  })
  .catch(next);
})

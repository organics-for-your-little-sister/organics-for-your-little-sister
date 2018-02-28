const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
<<<<<<< HEAD
router.use('/products', require('./sarah-products'))
=======
router.use('/products', require('./products_eunji'));
router.use('/reviews', require('./reviews_eunji'));
>>>>>>> 9c6592abeba43d720032b1889a6786bb5362fea8

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})

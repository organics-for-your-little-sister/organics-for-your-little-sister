const router = require('express').Router();
const { LineItem, Product } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
	// if(req.session.cart) {
	// 	req.session.cart.push('a string');
	// } else {
	// 	req.session.cart = [];
	// }
	// console.log(req.session.cart)
 LineItem.findAll()
   .then( lineItems => res.json(lineItems))
   .catch(next);
})

// lineitems/1
router.get('/:lineId', (req, res, next) => {
 LineItem.findById(req.params.lineId, { include: [{model: Product }]})
 .then(lineitem => res.json(lineitem))
 .catch(next);

})

router.post('/', (req, res, next) => {
  console.log(req.body)
 LineItem.create(req.body)
   .then( lineitem => res.status(204).json(lineitem))
   .catch(next)
})

router.put('/:lineId', (req, res, next) => {
 LineItem.update(req.body, { where: { id: req.params.id}, returning: true })
   .then(([num, updated]) => res.json(updated[0]))
   .catch(next)
})

router.delete('/:lineId', (req, res, next) => {
 LineItem.destroy({ where: { id: req.params.lineId }})
   .then(() => res.sendStatus(204))
   .catch(next);
})

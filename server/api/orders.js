const router = require('express').Router()
const {User,Order,LineItem} = require('../db/models')
module.exports = router

//GET:-All Orders
router.get('/',(req,res,next)=> {
	Order.findAll({})
	.then(function(orders){
		res.status(200).json(orders);
	})
	.catch(next);
});

//GET:-Order by ID
router.get('/:id', (req, res, next) => {
    Order.findById(req.params.id,{
		include: [{model: User},{model: LineItem}]
	})
		.then(function(order){
			res.status(200).json(order);
		})
		.catch(next);
});


router.post('/', (req, res, next) => {
	Order.create(req.body) 
		.then(order => res.status(201).json(order))
		.catch(next);
})

router.put('/:id', (req, res, next) => {
	Order.update(req.body, { 
		where: {id: req.params.id},
    returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	Order.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})

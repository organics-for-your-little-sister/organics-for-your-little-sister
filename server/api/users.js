const router = require('express').Router()
const {User, Review, Address, Order, LineItem, Product } = require('../db/models')
const { isLoggedIn, makeError, isAdmin } = require('../../utilities');
module.exports = router

//GET:-All Users
router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
	User.findAll({include: [{model: Address}]})
	.then(users => res.status(200).json(users))
	.catch(next);
});

//GET:-Single User by ID
router.get('/:id', isLoggedIn, (req, res, next) => {
	if (req.user.id === +req.params.id || req.user.isAdmin === true) {
    User.findById(req.params.id, {include: [{model: Review}, {model: Address}]})
		.then(user => res.status(200).json(user))
		.catch(next);
	} else {
		return next(makeError(403, 'You cannot view other member\'s profiles'));
	}
});

router.get('/:id/addresses', (req, res, next) => {
	Address.findAll({where: {userId: req.params.id}})
		.then(addresses => res.json(addresses))
		.catch(next);
})


//GET all the orders of the specific user: ex) users/1/orders 
router.get('/:userId/orders/', (req, res, next)=>{
	//if(req.user.id === req.params.userId || req.user.isAdmin === true ){
		Order.findAll({ where: { userId: req.params.userId}, include: [{ model: User}, {model: LineItem}]})
		.then( manyOrders => res.json(manyOrders))
		.catch(next)
	//} else {
	//	return next(makeError(403, 'You cannot view other member\'s order'))
	//}
})

// GET a single order of the specific user: ex) users/1/orders/2
router.get('/:userId/orders/:orderId', (req, res, next)=>{
	//if(req.user.id === req.params.userId || req.user.isAdmin === true ){
		Order.findById(req.params.orderId,{include: [{model: User}, {model: LineItem}]} )
		.then( theOrder => res.json(theOrder))
		.catch(next)
	//} else {
		//return next(makeError(403, 'You cannot view other member\'s order'))
	//}
})

// GET all the reviews of the specific user users/1/reviews 
router.get('/:userId/reviews', (req, res, next)=>{
		Review.findAll({ where: { userId: req.params.userId }, include: [{model: User}, {model: Product }]})
			.then( manyReviews => res.json(manyReviews))
			.catch(next)	
})

// GET a single review of the specific user: ex) users/1/reviews/2
router.get('/:userId/reviews/:reviewId', (req, res, next)=>{
	Review.findById(req.params.reviewId, {include: [{model: User}, {model: Product }]})
		.then(aReview => res.json(aReview))
		.catch(next)
})

router.post('/', (req, res, next) => {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	})
		.then(user => res.status(201).json(user))
		.catch(next);
})

router.put('/:id', isLoggedIn, (req, res, next) => {
	if (req.user.isAdmin) {
		User.update(req.body, {
			where: {id: req.params.id},
			returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
	} else if (req.user.id === req.params.id) {
			User.update({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email
			}, {
				where: {id: req.params.id},
				returning: true
		})
			.then(([_, updated]) => res.status(201).json(updated[0]))
			.catch(next)
		}
		else {
			return next(makeError(403, 'You cannot edit other member\'s profiles'));
		}
})

router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
	User.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})

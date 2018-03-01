const router = require('express').Router()
<<<<<<< HEAD
const {User, Review} = require('../db/models')
module.exports = router

//GET:-All Users
router.get('/', (req, res, next) => {
	User.findAll({})
	.then(function(users){
		res.status(200).json(users);
	})
=======
const {User, Review, Address} = require('../db/models')
const { isLoggedIn, makeError, isAdmin } = require('../../utilities');
module.exports = router

//GET:-All Users
router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
	User.findAll({include: [{model: Address}]})
	.then(users => res.status(200).json(users))
>>>>>>> 63935b1e5580b57cec12c2dcab053a008fd1cd4c
	.catch(next);
});

//GET:-User by ID
<<<<<<< HEAD
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id, {include: [{ model: Review }]})
		.then(function(user){
			res.status(200).json(user);
		})
=======
router.get('/:id', isLoggedIn, (req, res, next) => {
	if (req.user.id === req.params.id || req.user.isAdmin === true) {
    User.findById(req.params.id, {include: [{model: Review}, {model: Address}]})
		.then(user => res.status(200).json(user))
>>>>>>> 63935b1e5580b57cec12c2dcab053a008fd1cd4c
		.catch(next);
	}
	else {
		return next(makeError(403, 'You cannot view other member\'s profiles'));
	}
});

<<<<<<< HEAD
router.get('/:userId/reviews/:reviewId', (req, res, next)=>{
	Review.findById({ where: { userId: req.params.userId }})
		.then( reviews => {
			const theReview = reviews.filter( aReview => aReview.id === req.params.reviewId )
			res.json(theReview)
		})
		.catch(next)

})


// router.get('/', (req, res, next) => {
//   User.findAll({
//     // explicitly select only the id and email fields - even though
//     // users' passwords are encrypted, it won't help if we just
//     // send everything to anyone who asks!
//     attributes: ['id', 'email']
//   })
//     .then(users => res.json(users))
//     .catch(next)
// })


router.post('/', (req, res, next) => {

			User.create(req.body) // watch out for isAdmin changes
			.then(user => res.status(201).json(user))
			.catch(next);

=======
router.post('/', (req, res, next) => {
	User.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	})
		.then(user => res.status(201).json(user))
		.catch(next);
>>>>>>> 63935b1e5580b57cec12c2dcab053a008fd1cd4c
})

router.put('/:id', isLoggedIn, (req, res, next) => {
	if (req.user.isAdmin) {
		User.update(req.body, {
			where: {id: req.params.id},
			returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
	}
	else {
		if (req.user.id === req.params.id) {
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
	}
})

router.delete('/:id', isLoggedIn, isAdmin, (req, res, next) => {
	User.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})

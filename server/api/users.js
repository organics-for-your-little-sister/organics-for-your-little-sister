const router = require('express').Router()
const {User, Review} = require('../db/models')
const { isLoggedIn, makeError, isAdmin } = require('../../utilities');
module.exports = router

//GET:-All Users
router.get('/', isLoggedIn, isAdmin, (req, res, next) => {
	User.findAll()
	.then(users => res.status(200).json(users))
	.catch(next);
});

//GET:-User by ID
router.get('/:id', isLoggedIn, (req, res, next) => {
	if (req.user.id === req.params.id || req.user.isAdmin === true) {
    User.findById(req.params.id, {include: [{model: Review}]})
		.then(user => res.status(200).json(user))
		.catch(next);
	}
	else {
		return next(makeError(403, 'You cannot view other member\'s profiles'));
	}
});


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

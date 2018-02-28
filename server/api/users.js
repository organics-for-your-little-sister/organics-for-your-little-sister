const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

//GET:-All Users
router.get('/', (req, res, next) => {
	User.findAll({})
	.then(function(users){
		res.status(200).send(users);
	})
	.catch(next);
});

//GET:-User by ID
router.get('/:id', (req, res, next) => {
    User.findById(req.params.id)
		.then(function(user){
			res.status(200).send(user);
		})
		.catch(next);
});


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
})

router.put('/:id', (req, res, next) => {
	User.update(req.body, { // watch out for isAdmin changes, only if your logged-in id matches the id
		where: {id: req.params.id},
    returning: true
		})
		.then(([_, updated]) => res.status(201).json(updated[0]))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	User.destroy({where: {id: req.params.id}})
		.then(() => res.sendStatus(204))
		.catch(next)
})

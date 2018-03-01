const makeError = (status, message) => {
	const err = new Error(message);
	err.status = status;
	return err;
}

const isLoggedIn = (req, res, next) => {
	// only get here if you log in
	// if there is a req.user someone is logged in
	// send 401 unauthorized
	if (!req.user) return next(makeError(401, 'Login'))
	next()
}

const isAdmin = (req, res, next) => {
	if (!req.user.isAdmin) return next(makeError(403, 'Forbidden'))
	next();
}

module.exports = {
	isLoggedIn,
	makeError,
	isAdmin
}

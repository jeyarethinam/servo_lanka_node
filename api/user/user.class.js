class User {

	constructor() {}

	validateLoginBody(req, res) { // login body param validation
		req.checkBody('username', 'Invalid username').notEmpty().withMessage("username can not be empty");
		req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
	}

	validateEmailLoginBody(req, res) { // login body param validation
		req.checkBody('username', 'Invalid username').notEmpty().withMessage("username can not be empty");
	}

	loginResponse(req, data) {
		var user = {
			id: data.id,
			email: data.email,
			browser: req.useragent.browser + '_' + req.useragent.version,
			ip: req.connection.remoteAddress
		}
		// console.info(data);
		var userfl = (data.firstname != undefined && data.lastname != undefined)?data.firstname+" "+data.lastname:data.email;
		return {
			token: appFun.jwtToken(user),
			uId: data.id,
			status:data.status,
			name:userfl,
		}
	}

	loginResponseOnlyEmail(req, data) {
		var user = {
			id: data.id,
			browser: req.useragent.browser + '_' + req.useragent.version,
			ip: req.ip
		}

		return {
			token: appFun.jwtToken(user),
			uId: data.id
		}
	}
	validateRegistrationBody(req, res) { // login body param validation	
		req.checkBody('username', 'Invalid username').notEmpty().withMessage("username can not be empty");
		req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
		req.checkBody('confirm_password', 'Invalid confirm password').notEmpty().withMessage("confirm password can not be empty");
	}

	validateChangePasswordBody(req, res) {
		req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
		// req.checkBody('confirm_password', 'Invalid confirm password').notEmpty().withMessage("confirm password can not be empty");
	}

}

module.exports = User;
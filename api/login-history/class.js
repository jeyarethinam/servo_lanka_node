class Funds {

	constructor() {
	}

	validateAddBody(req,res) {
		req.checkBody('amount', 'Invalid amount').notEmpty().withMessage("amount can not be empty");
		req.checkBody('clientId', 'Invalid clientId').notEmpty().withMessage("clientId can not be empty");
		req.checkBody('pair', 'Invalid pair').notEmpty().withMessage("pair can not be empty");
	
	}
}

  module.exports = Funds;
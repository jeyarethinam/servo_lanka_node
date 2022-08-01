class Order {

	constructor() {
	}

	validateOrderBody(req,res) {
		req.checkBody('amount', 'Invalid amount').notEmpty().withMessage("amount can not be empty");
		req.checkBody('coinId', 'Invalid coinId').notEmpty().withMessage("coinId can not be empty");
		req.checkBody('customerId', 'Invalid customerId').notEmpty().withMessage("customerId can not be empty");
		req.checkBody('details', 'Invalid details').notEmpty().withMessage("details can not be empty");
		req.checkBody('fee', 'Invalid fee').notEmpty().withMessage("fee can not be empty");
		req.checkBody('filled', 'Invalid filled').notEmpty().withMessage("filled can not be empty");
		req.checkBody('marketId', 'Invalid marketId').notEmpty().withMessage("marketId can not be empty");
		req.checkBody('date', 'Invalid date').notEmpty().withMessage("date can not be empty");
		req.checkBody('pair', 'Invalid pair').notEmpty().withMessage("pair can not be empty");
		req.checkBody('marketKey', 'Invalid marketKey').notEmpty().withMessage("marketKey can not be empty");
		req.checkBody('price', 'Invalid price').notEmpty().withMessage("price can not be empty");
		req.checkBody('total', 'Invalid total').notEmpty().withMessage("total can not be empty");
		req.checkBody('orderType', 'Invalid orderType').notEmpty().withMessage("orderType can not be empty");
		req.checkBody('tradeOptionType', 'Invalid tradeOptionType').notEmpty().withMessage("tradeOptionType can not be empty");
		req.checkBody('sortOrder', 'Invalid sortOrder').notEmpty().withMessage("sortOrder can not be empty");
		req.checkBody('orderStatus', 'Invalid orderStatus').notEmpty().withMessage("orderStatus can not be empty");
		req.checkBody('actualAmount', 'Invalid actualAmount').notEmpty().withMessage("actualAmount can not be empty");
		req.checkBody('orderStatus', 'Invalid orderStatus').notEmpty().withMessage("orderStatus can not be empty");
		req.checkBody('orderCondition', 'Invalid orderCondition').notEmpty().withMessage("orderCondition can not be empty");
		req.checkBody('tradePattern', 'Invalid tradePattern').notEmpty().withMessage("tradePattern can not be empty");
	}

}

  module.exports = Order;
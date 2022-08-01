
'use strict';
var db = require("../../database/mysql/industry");




exports.getAllInsustries = function (req, res, next) {
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if (reqBodyResult != null) return res.status(400).json(
		appFun.errorRes([{ message: reqBodyResult }])

	);
	db.getAllIndustry((err, result, data) => {
		if (err) {
			return res.status(400).json(
				appFun.errorRes([{ message: result }]));
		} else {
			return res.status(200).json(appFun.successRes(result));
		}
	});

}
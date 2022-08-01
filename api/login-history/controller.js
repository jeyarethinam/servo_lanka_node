'use strict';
var db = require('../../database/'+config.enabledDb+'/login-history')
var Cls = require('./class')
var cls = new Cls();

exports.getByUserId = function(req,res,next){
	// return res.status(400).json({status: false, message: "failed", result: 'Something went wrong'});
	db.getByUserId(req.params.id,(err,result)=>{
		// console.info(result);
		if(err) return res.status(400).json({status: false, message: "failed", result: 'Something went wrong'});
		
		return res.status(200).json({status: true, message: "success", result:result});
	});	
}





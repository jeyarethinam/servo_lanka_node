'use strict';
var db = require('../../database/'+config.enabledDb+'/user')
var balances = require('../../database/'+config.enabledDb+'/balances')
var User = require('./user.class')
var user = new User();

var tls = require('tls');

exports.test = (req, res, next)=>{

	
	return res.status(200).json({status: true, message: "success", result:'success'});
}

exports.login = function (req, res, next) {

	user.validateLoginBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

	db.login(req.body.username,req.body.password ,function(err,result){
		if(err){
			return res.status(400).json({status: false, message: "failed", result:result});
		}
		db.loginHistory(result,req,function(err,re){});
		
		return res.status(200).json({status: true, message: "success", result:user.loginResponse(req,result)});
		
	});
}
exports.loginWithEmail = function (req, res, next) {

	user.validateEmailLoginBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
	db.loginWithEmail(req.body.username, function(err,result){
		if(err){
			return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
		}
		return res.status(200).json({status: true, message: "success", result: user.loginResponseOnlyEmail(req,{id:result.uid})});
	});
}

exports.sendMailWhenUserLogin = function (req, res, next) {

	user.validateEmailLoginBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

	db.loginWithEmail(req.body.username, function(err,result){
		// console.info(result.email);
		if(err){
			return res.status(400).json({status: false, message: "failed", result:result});
		}

		mail.sendMailUsingSendgrid(result.email,'Ceybit Trading security code',keyMailtemplate(req,result), function(err,result){
			if(err) return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
			return res.status(200).json({status: true, message: "success", result: 'Check mail box'});
		});
	});
	
}

function keyMailtemplate(req,result){

	// let html = '<div style=" background-color: #e4e4e4;border-radius: 10px;padding: 10px;"><p> Hi </p>'+
	// 			'<p>You have successfully logged in</p>'+
	// 			'<p>Login: '+req.body.username+'</p>'+
	// 			'<p>IP address: '+req.ip+'</p>'+
	// 			'<p>Browser: '+req.useragent.browser+'_'+req.useragent.version+'</p>'+
	// 			'<p>Time: '+new Date()+'</p>'+
	// 			'<p>Please copy this code and login CBIT account : <span style="color:red"><b>'+result+'</b></span></p><br>'+
	// 			'<p>Thanks,<br>The CBIT Security Team</p></div>';

	const html = `
	<div style="width:550px; height:500px; margin:40px auto; padding:40px; border:1px solid #ddd; background:#f7f7f7;">
	<div style="text-align:center;"><img style="width:180px; height:140px;"  src="https://ceybit.net/ico/assets/img/logo/logo-newsletter.png"/></div>
	<div style="font-size:22px; text-align:center; font-weight:bold; margin:20px;">Verify your email</div>
	 Hi, 

	<p>In order to proceed your trading, we will need you to confirm your email address by entering the below security code (Copy & Paste) :</p>
	<div style="background: #292929; color:#ffffff; padding:20px; width:300px; margin:20px auto 50px auto; text-align:center;">`+ result +`</div>
	<p>If you did not sign in for this account you can ignore this email.</p>
	<p>Thank You</p>
	<p><b>Ceybit Security Team</b></p>
	
	</div>
	`;

	return html;
}


exports.validateAuthKey = function(req, res){
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

	
	db.validateAuthKey(req.body.key, function(err, result){
		if(err){
			return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
		}else if(!result.exists){
			return res.status(403).json({status: false, message: "failed", result:'There is a no record'});
		}
		var keyExpired = result.data().created+5*60*1000 < new Date().getTime();
		if(keyExpired){
			return res.status(403).json({status: false, message: "failed", result:'Key has been expired'});
		}
		// console.info(result.data().created+5*60*1000 < new Date().getTime());
		return res.status(200).json(
			{status: true,
			message: "success", 
			result: user.loginResponseOnlyEmail(req,{id:result.data().uid})
		});
		
		
	});
}

exports.register = function (req, res, next) {

	user.validateRegistrationBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
		
	db.register(req.body.username,req.body.password ,function(err,result){
		// console.info(result)
		if(err){		
			return res.status(400).json({status: false, message: "failed", result:result});
		}
		balances.addDefault(result.uid,function(err,result){});
		return res.status(200).json({status: true, message: "success", result:'Registraton success'});
	});
}


exports.changePassword = function(req, res, next){

	user.validateChangePasswordBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
	// verifyToken
	appFun.verifyToken(req,function(err,result){
		console.info(result);
		if(err){
			return res.status(400).json({status: false, message: "failed", result:result});
		}else{
			db.changePassword(result.id,req.body.password ,function(err,result){
				if(err){
					return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
				}
				return res.status(200).json({status: true, message: "success", result:'password changed success'});
			});
		}
		
	});
	
}

exports.update = function(req, res, next){

	// user.validateChangePasswordBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
	
	db.update(req.params.id,req.body ,function(err,result){
		if(err){
			return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
		}
		return res.status(200).json({status: true, message: "success", result:'Successfully Updated'});
	});
}

exports.getById = function(req, res, next){

	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if(reqBodyResult != null)  return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
	
	db.getById(req.params.id ,function(err,result){
		if(err){
			return res.status(400).json({status: false, message: "failed", result:'Somthing went wrong'});
		}
		else if(result == undefined){ return res.status(400).json({status: false, message: "failed", result:'There is no user'})}
		delete result.password;
		return res.status(200).json({status: true, message: "success", result:result});
	});
}
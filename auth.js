/*
Authenticator

Lets you add multiple custom authentication methods to
be used into the radius class.

*/
class Auth{	
	static checkAuth(svr, username, password, cb){
		for(var a=0; a<Auth.authenticators.length; a++){
			if( Auth.authenticators[a].name==svr.authMethod ) {
				return Auth.authenticators[a].cb(svr, username, password, cb);
			}
		}
		console.log('Auth: Authentication method "'+svr.authMethod+'" not found, check your config.json!');
		return false;
	}
	
	constructor(name, cb){
		this.cb=cb;
		this.name=name;
		Auth.authenticators.push(this);
	}
}
Auth.authenticators = [];
module.exports = Auth;

mods = require('./mods.js');

//Test Authentication Method (Static Array)
var arrayAuth=new Auth('array', function(svr, username, password, cb){
	for(a=0; a<svr.auth.length; a++){
		if(svr.auth[a].username==username && svr.auth[a].password==password){
				cb(true);
				return;
		}
	}
	cb(false);
});

//HTTP NTLM Authentication Module
/*
var httpntlm = require('httpntlm');
var httpntlmAuth=new Auth('httpntlm', function(svr, username, password, cb){
	httpntlm.get({
		url: 'http://127.0.0.1', //TODO: should be in config.json (svr?)
		'username': username,
		'password': password,
		workstation: './',
		domain: ''	
	}, function(err, res){
		if(err){
			cb(false); //Access Denied if error
			return err;
		}
		if(res.headers['www-authenticate'] === undefined){
			cb(true);
		}else{
			cb(false);
		}
	}.bind(cb));

});
*/
/*
Authenticator

Lets you add multiple custom authentication methods to
be used into the radius class.

*/
class Auth{	
	static checkAuth(svr, username, password){
		for(var a=0; a<Auth.authenticators.length; a++){
			if( Auth.authenticators[a].name==svr.authMethod ) {
				return Auth.authenticators[a].cb(svr, username, password);
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

//Test Authentication Method (Static Array)
var arrayAuth=new Auth('array', function(svr, username, password){
	for(a=0; a<svr.auth.length; a++){
		if(svr.auth[a].username==username && svr.auth[a].password==password) return true;
	}
	return false;
});

/*
Radius Class

Most of the heavy lifting is done by the radius npm module;
This class is pretty much just a virtual server interface.

*/
var nRadius = require('radius');
var auth = require('./auth.js')


class Radius{
	constructor(config){
		this.config = config;
	}
	
	matchSecret(msg){
		for(var a=0; a<this.config.servers.length; a++){
			try{
				this.packet = nRadius.decode({packet: msg, secret: this.config.servers[a].secret});
			}catch(ex){
				if(a==this.config.servers.length-1) {
					return null;
				}
				continue;
			}
			return this.config.servers[a];
		}
	}
	
	sendReply(server, rinfo, state){
		var code = state?'Access-Accept':'Access-Reject';

		var response = nRadius.encode_response({
			packet: this.packet,
			code: code,
			secret: this.cServer.secret
		});

		console.log('RADIUS: '+this.cServer.name+': Sending ' + code + ' for user ' + this.username);
	
		server.send(response, 0, response.length, rinfo.port, rinfo.address, function(err, bytes) {
			if (err) {
				console.log('RADIUS: '+this.cServer.name+':Error sending response to ', rinfo);
			}
		});
	}

	processPacket(msg, cb, rinfo){
		this.msg = msg
		var code, password;
		this.packet=null;
		
		this.cServer=this.matchSecret(msg);
		if(this.cServer==null){
			console.log('RADIUS: Could Not Match Secret!');
			return null;
		}
		
		if (this.packet.code != 'Access-Request') {
			console.log('RADIUS: '+currentServer.name+': unknown packet type: ', this.packet.code);
			return null;
		}

		this.username = this.packet.attributes['User-Name'];
		password = this.packet.attributes['User-Password'];

		console.log('RADIUS: '+this.cServer.name+': Access-Request for ' + this.username);
		return auth.checkAuth(this.cServer, this.username, password, cb);
	}
}
module.exports = Radius;

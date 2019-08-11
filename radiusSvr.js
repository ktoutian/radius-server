/*
Multi-Platform Radius Server

Shouldn't need to touch anything in here unless your doing
somthing custom, I would suggest looking at the config.json
file.

TODO Summary
(*) Configure port in config
(*) Allow multiple ports that can be assigned virtual servers.
(*) Allow src and dst IP address to define virtual servers (optional in config)
(*) Some sort of logging?
(*) Better error handling, or maybe any error handling...
(*) More Auth Modules!

*/
var dgram = require('dgram');
var fs = require('fs');
var radius = require('./radius.js');

var conf = JSON.parse(fs.readFileSync('config.json'));
var server = dgram.createSocket('udp4');

server.on('message', function (msg, rinfo) {
	var userAuth, rad;
	
	rad = new radius(conf);
	userAuth = rad.processPacket(msg);
	
	if (userAuth!==null){
		rad.sendReply(server, rinfo, userAuth);
	}
});

server.on('listening', function () {
	var address = server.address();
	console.log('radius server listening ' +
			address.address + ":" + address.port);
});

server.bind(1812);

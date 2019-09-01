# radius-server<br/>Multi-Platform Modular NodeJS Radius Server

Since it was so hard to find a simple, free, working radius server for windows... 
here is a rough working one :)

## How to use: ##
1) npm install radius dgram
2) edit config.json
3) nodejs ./radiusSvr

## Features: ##
* Multiple Virtual Servers on the one actual server
* Can setup multiple custom authentication methods

## TODO Summary: ##
* Configure port in config
* Allow multiple ports that can be assigned virtual servers.
* Allow src and dst IP address to define virtual servers (optional in config)
* Some sort of logging?
* Better error handling, or maybe any error handling...
* More Auth Modules!

## Enable HTTP NTLM (Windows Authentication) ##
* npm install httpntlm
* un-comment code at the bottom of auth.js
* point to a IIS server with Windows Authentication Enabled

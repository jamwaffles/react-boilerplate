"use strict"

require("babel-polyfill")
require('babel-register')
let winston = require('winston')
require('winston-loggly-bulk')

if(process.env.LOGGLY_TOKEN) {
	winston.add(winston.transports.Loggly, {
		inputToken: process.env.LOGGLY_TOKEN,
		subdomain: 'yoursubdomainhere',
		tags: [ process.env.ENVIRONMENT || 'development' ],
		json: true,
	})
}

let server = require('./server')

winston.level = process.env.LOG_LEVEL || 'info'

server.listen(process.env.PORT || 3000, function() {
	winston.info('Listening on port', process.env.PORT || 3000)
})
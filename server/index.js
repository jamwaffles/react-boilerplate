import 'isomorphic-fetch'
import path from 'path'
import Koa from 'koa'
import http from 'http'
import winston from 'winston'
import convert from 'koa-convert'

winston.cli()

winston.setLevels(winston.config.syslog.levels)

winston.addColors({
	...winston.config.syslog.colors,
	error: 'bgRed',
})

// Package middleware
import body from 'koa-bodyparser'
import serve from 'koa-static-cache'

import { prefixPath } from '../app/lib/util'

import router from './routes'

// Custom middleware
import envData from './middleware/envData'
import requestLogger from './middleware/requestLogger'
import injectRedux from './middleware/injectRedux'
import isXhr from './middleware/isXhr'

let app = new Koa()

app.keys = [ 'Wowser', 'WhatAShow' ]

app.use(convert(body()))

app.use(convert(serve(path.resolve(__dirname, '../', 'public'), { prefix: prefixPath('/public'), dynamic: true, buffer: process.env.NODE_ENV === 'production' })))

app.use(isXhr)
app.use(injectRedux)
app.use(envData)
app.use(requestLogger)

app.use(router.routes())

const server = http.createServer(app.callback())

module.exports = server
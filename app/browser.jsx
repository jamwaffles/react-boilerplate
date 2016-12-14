import 'babel-polyfill'
import 'whatwg-fetch'

import '../less/style.less'

import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import { configureStore } from './store'

import App from './'
import routes from './routes'

const store = configureStore(browserHistory, window.__INITIAL_STATE__)

const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
	<App store={store}>
		<Router history={history} routes={routes} />
	</App>,
	document
)
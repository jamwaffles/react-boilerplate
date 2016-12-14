import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'

import thunk from 'redux-thunk'

import rootReducer from './reducers'

export function configureStore(history, initialState = {}) {
	return createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(routerMiddleware(history)),
			applyMiddleware(thunk),
			typeof window !== 'undefined' && window.devToolsExtension ? window.devToolsExtension() : f => f,
		)
	)
}
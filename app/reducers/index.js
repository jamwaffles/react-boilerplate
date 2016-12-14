import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import session from './session'
import metadata from './metadata'

export default combineReducers({
	session,
	metadata,
	routing: routerReducer,
})
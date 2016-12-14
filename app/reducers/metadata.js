import { SESSION_SETUP, SET_METADATA } from '../actions/session'

export default function metadata(store = {}, action = {}) {
	switch(action.type) {
		case SESSION_SETUP:
		case SET_METADATA:
			return {
				...store,
				...action.data,
			}

		default: return store
	}
}
import { SESSION_SETUP } from '../actions/session'

export default function session(store = { query: {}, env: {} }, action = {}) {
	switch(action.type) {
		case SESSION_SETUP:
			return {
				...store,
				...action.data,
			}

		default: return store
	}
}
export const SESSION_SETUP = 'SESSION_SETUP'
export const SET_METADATA = 'SET_METADATA'

export function sessionSetup(data = {}) {
	return {
		type: SESSION_SETUP,
		data,
	}
}

export function setMetadata(data = {}) {
	return {
		type: SET_METADATA,
		data,
	}
}
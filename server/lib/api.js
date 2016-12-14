import winston from 'winston'

const apiHost = process.env.CUSTOMER_API_HOST || 'http://localhost:9000/api'

export function doRequest(apiPath, requestParams = {}) {
	const start = Date.now()

	const body = requestParams.body ? JSON.stringify(requestParams.body) : null

	const opts = { ...requestParams, body, headers: { 'Content-Type': 'application/json', ...requestParams.headers } }

	const url = `${apiHost}${apiPath}`

	return fetch(url, opts)
		.then(res => {
			winston.info('apiCall', { url, headers: opts.headers, time: (Date.now() - start) })

			return res
		})
}

export function parseResponseBody(res) {
	const { headers } = res
	const contentType = headers.get('Content-Type') || ''

	return contentType.startsWith('application/json') ? res.json() : res.text()
}
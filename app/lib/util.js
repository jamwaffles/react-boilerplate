import url from 'url'
import path from 'path'
import 'moment/locale/en-gb'

export function httpCall(url, options = {}) {
	let { body } = options
	let headers = {
		...options.headers,
		'X-Requested-With': 'XMLHttpRequest',
	}

	if(typeof options.body !== 'string') {
		headers['Content-Type'] = 'application/json'

		body = JSON.stringify(body)
	}

	const base = typeof window !== 'undefined' ? '' : `http://localhost:${process.env.PORT || 9001}`

	return fetch(prefixPath(base + url), {
		credentials: 'same-origin',
		...options,
		body,
		headers,
	})
}

export function apiCall(url, options = {}) {
	return httpCall(`/api/${url}`, options)
}

const prefix = '/'

export function prefixPath(unprefixed = '') {
	const parts = url.parse(unprefixed, true)

	const prefixedPath = path.join(prefix, (parts.pathname || '').replace(prefix, '')).replace(/\/$/, '')

	const obj = {
		...parts,
		pathname: prefixedPath,
	}

	return url.format(obj)
}

export function mask(input, maskChar = '*') {
	if(typeof input !== 'string') {
		return input
	}

	return input.replace(/./g, maskChar)
}

export function isGuid(value) {
	if(!value) {
		return false
	}

	const validator = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i

	return validator.test(value.toString())
}

// Turn a normal string into something URL friendly
export function slug(humanString = '') {
	const expanded = [ ...humanString ].map(char => {
		switch(char) {
			case '&': return '-and-'
			default: return char
		}
	}).join('')

	return expanded
		.toLowerCase()
		// Remove all non-char or digit characters
		.replace(/[^\w\d-]/ig, '-')
		// Strip consecutive dashes
		.replace(/-{2,}/g, '-')
		// Strip leading or trailing dashes
		.replace(/^-+|-+$/g, '')
}
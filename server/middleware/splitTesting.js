export default function *splitTesting(next) {
	let variation = Math.random() > .5 ? 'creditScore' : 'eligibilityScore'

	if(this.request.query.var) {
		variation = this.request.query.var
	} else if(this.cookies.get('PulseVariation')) {
		variation = this.cookies.get('PulseVariation')
	} else {
		this.cookies.set('PulseVariation', variation, { httpOnly: true })
	}

	this.cookies.set('PulseVariation', variation, { httpOnly: true })

	this.state = {
		...this.state,
		session: {
			...this.state.session,
			variation,
		},
	}

	yield next
}
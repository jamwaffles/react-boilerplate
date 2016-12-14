import { prefixPath } from '../../app/lib/util'

export default async (ctx, next) => {
	const customerId = ctx.cookies.get('PulseCustomerId')
	const sessionToken = ctx.cookies.get('PulseSessionToken')

	if(!customerId || !sessionToken) {
		ctx.redirect(prefixPath(`/login?returnUrl=${encodeURIComponent(ctx.request.url)}&flash=unauthorised`))

		return
	}

	ctx.state.isAuthenticated = true

	await next()
}
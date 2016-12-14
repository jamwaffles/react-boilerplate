import winston from 'winston'

export default async (ctx, next) => {
	const start = new Date

	await next()

	const ms = new Date - start

	const { session } = ctx.state.store.getState()

	if(ctx.request.path.indexOf('/health') === -1) {
		winston.info('httpRequest', {
			method: ctx.request.method,
			status: ctx.response.status,
			path: ctx.request.path,
			size: ctx.response.length,
			time: ms,
			sessionId: session.visitGuid,
			customerId: ctx.cookies.get('PulseCustomerId'),
			...session.env,
		})
	}
}
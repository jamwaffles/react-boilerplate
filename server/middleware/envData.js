import { sessionSetup } from '../../app/actions/session'

export default async (ctx, next) => {
	const envFlags = (process.env.FEATURES || '').split(',')
	const queryFlags = (ctx.request.query.features || '').split(',')

	ctx.state.store.dispatch(sessionSetup({
		query: ctx.request.query,
		env: {
			hostname: process.env.HOSTNAME || `localhost`,
			revision: process.env.GIT_COMMIT || 'develop',
			environment: process.env.ENVIRONMENT || 'development',
		},
		features: [ ...envFlags, ...queryFlags ],
	}))

	await next()
}
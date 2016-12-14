export default async (ctx, next) => {
	ctx.request.xhr = ctx.request.get('X-Requested-With') === 'XMLHttpRequest'

	await next()
}
import { createMemoryHistory } from 'react-router'

import { configureStore } from '../../app/store'

export default async (ctx, next) => {
	ctx.state.memoryHistory = createMemoryHistory({
		initialEntries: [ ctx.request.url ],
		initialIndex: 0,
		keyLength: 6,
	})

	ctx.state.store = configureStore(ctx.state.memoryHistory)

	await next()
}
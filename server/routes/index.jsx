import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Router from 'koa-router'
import { match, RouterContext } from 'react-router'
import winston from 'winston'
import { syncHistoryWithStore } from 'react-router-redux'

import { setMetadata } from '../../app/actions/session'
import App from '../../app'
import NotFound from '../../app/pages/NotFound'
import routes from '../../app/routes'

let router = new Router()

router.get('/health', async ctx => {
	ctx.response.status = 200
})

router.get('*', async ctx => {
	const history = syncHistoryWithStore(ctx.state.memoryHistory, ctx.state.store)

	await new Promise((resolve, reject) => {
		match({ history, routes, location: ctx.request.url }, (error, redirectLocation, renderProps) => {
			if(error) {
				winston.error('pageRenderError', error)

				ctx.response.status = 500
				ctx.response.body = error.message

				resolve()
			} else if(redirectLocation) {
				ctx.response.status = 302
				ctx.redirect(redirectLocation.pathname + redirectLocation.search)

				resolve()
			} else if(renderProps) {
				const matchedComponent = renderProps.components[renderProps.components.length - 1]

				if(typeof matchedComponent.getMetadata === 'function') {
					ctx.state.store.dispatch(setMetadata(matchedComponent.getMetadata()))
				}

				if(typeof matchedComponent.getData === 'function') {
					matchedComponent.getData({ store: ctx.state.store, query: ctx.request.query })
						.then(() => {
							ctx.response.status = 200
							ctx.response.body = ReactDOMServer.renderToString(
								<App store={ctx.state.store}>
									<RouterContext {...renderProps} />
								</App>
							)
						})
						.then(resolve)
						.catch(e => {
							winston.error(e)

							reject(e)
						})
				} else {
					ctx.response.status = 200
					ctx.response.body = ReactDOMServer.renderToString(
						<App store={ctx.state.store}>
							<RouterContext {...renderProps} />
						</App>
					)

					resolve()
				}
			} else {
				ctx.state.store.dispatch(setMetadata({ title: "Page Not Found" }))

				ctx.response.status = 404

				ctx.response.body = ReactDOMServer.renderToString(
					<App store={ctx.state.store}>
						<NotFound />
					</App>
				)

				resolve()
			}
		})
	})
})

export default router
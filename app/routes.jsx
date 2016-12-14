import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Home from './pages/Home'

function handleRouteChange(prevState, nextState) {
	const nextRoute = nextState.routes[nextState.routes.length - 1].component

	const { title } = nextRoute.getMetadata()

	if(title && typeof document !== undefined) {
		document.title = title
	}
}

export default (
	<Route path="/" onChange={handleRouteChange}>
		<IndexRoute component={Home} />
	</Route>
)
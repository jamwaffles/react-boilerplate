import React, { PureComponent } from 'react'
import { Provider } from 'react-redux'
import numeral from 'numeral'
import britishEnglish from 'numeral/languages/en-gb'

import { prefixPath } from './lib/util'

numeral.language('en-gb', britishEnglish)
numeral.language('en-gb')

export default class App extends PureComponent {
	static defaultProps = {
		metadata: {},
	}

	static propTypes = {
		store: React.PropTypes.object.isRequired,
		children: React.PropTypes.node.isRequired,
	}

	render = () => {
		const state = this.props.store.getState()

		return (
			<html>
				<head>
					<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />

					<link rel="stylesheet" href={prefixPath('/public/css/style.css')} />

					<script src={prefixPath('/public/js/manifest.js')} defer />
					<script src={prefixPath('/public/js/vendor.js')} defer />
					<script src={prefixPath('/public/js/main.js')} defer />

					<link rel="shortcut icon" href={prefixPath('/public/img/favicon.ico')} />

					<title>{state.metadata.title}</title>
				</head>

				<Provider store={this.props.store}>
					<body>
						{this.props.children}

						<script dangerouslySetInnerHTML={{ __html: `window.__INITIAL_STATE__ = ${JSON.stringify({ ...state, routing: {} })}` }} />
					</body>
				</Provider>
			</html>
		)
	}
}
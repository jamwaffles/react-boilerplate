const system = require('system')

const port = system.env.PORT || 9000

const path = "http://localhost:" + port + '/'

// Requires a `SET_SCORE` action handler in the `user` reducer. You also need to disable the ring animations in CSS

casper.start(path + 'pulse/dashboard?customerId=5fe3ef40-5316-11e6-a365-0aa574a17fd1', function() {
	for(var i = 0; i <= 1000; i++) {
		casper.evaluate(function(nobs) {
			window.store.dispatch({ type: 'SET_SCORE', score: nobs })
		}, i)

		casper.captureSelector('./score-rings/score-ring-' + i + '.png', '.dashboard__rings__main .svg-ring svg')
	}
})

casper.run()
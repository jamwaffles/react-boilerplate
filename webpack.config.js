const webpack = require('webpack')
const path = require('path')

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const nodeEnv = process.env.NODE_ENV || 'development'
const isProd = nodeEnv !== 'development'

module.exports = {
	devtool: 'source-map',
	context: __dirname,
	performance: {
		maxAssetSize: 100,
		maxInitialChunkSize: 300,
		hints: false,
	},
	entry: {
		main: [ './app/browser.jsx', './less/style.less' ],
		vendor: [
			'react',
			'react-dom',
			'react-redux',
			'react-router',
			'redux',
			'redux-thunk',
			'validate.js',
			'moment',
			'core-js',
			'numeral',
		],
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract({
					loader: [
						'css-loader?sourceMap',
						'postcss-loader?sourceMap',
						'less-loader?sourceMap&noIeCompat&ieCompat=false',
					],
				}),
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				],
			},
			{
				test: /\.json$/,
				use: [
					'json-loader',
				],
			},
			{
				test: /\.(jpeg|jpg|svg|png)$/,
				use: [
					'file-loader',
				],
			},
		],
	},
	resolve: {
		extensions: [ '.js', '.jsx', '.json' ],
		modules: [
			// path.resolve('./client'),
			'node_modules',
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
		}),
		new ExtractTextPlugin({ filename: 'css/style.css', disable: false, allChunks: true }),
		new webpack.optimize.CommonsChunkPlugin({
			name: [ 'vendor', 'manifest' ],
		}),
		new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
	].concat(isProd ? [
		new webpack.optimize.UglifyJsPlugin({
			cacheFolder: path.resolve(__dirname, 'public/cached_uglify/'),
			compress: {
				warnings: false,
			},
			mangle: true,
			minimize: true,
			output: {
				comments: false,
			},
			sourceMap: true,
		}),
	] : [
		new BundleAnalyzerPlugin({ analyzerMode: 'static', openAnalyzer: false }),
	]),
	devServer: {
		contentBase: './public',
	},
}
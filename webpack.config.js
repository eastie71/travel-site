// Give us the current "npm" task. eg. "dev" or "build"
const currentTask = process.env.npm_lifecycle_event
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fse = require('fs-extra')

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('postcss-hexrgba'),
	require('autoprefixer')
]

class RunAfterBuild {
	apply(compiler) {
		compiler.hooks.done.tap('Copy Image Files', function() {
			fse.copySync('./app/assets/images', './docs/assets/images')
		})
	}
}

let cssConfig = {
	test: /\.css$/i,
	/* css-loader has added option '?url=false' so that it disables handling of images in CSS (eg. background images) */
	use: ['css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins} }]
}

let htmlPages = fse.readdirSync('./app').filter(function(file) {
	return file.endsWith('.html')
}).map(function(page) {
	return new HtmlWebpackPlugin({
		filename: page,
		template: `./app/${page}`
	})
})

let config = {
	entry: "./app/assets/scripts/App.js",
	// See variable above - reads all files in the app folder that end in 'html' and syncs them in using the HtmlWebpackPlugin
	// In our case we currently only have one file (index.html) - but this will handle multiple files.
	plugins: htmlPages,
	module: {
		rules: [
			cssConfig
		]
	}
}

if (currentTask == 'dev') {
	// Add the style-loader to the css config for development 
	cssConfig.use.unshift('style-loader')
	config.output = {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app')
	}
	config.devServer = {
		before: function(app, server) {
			server._watch('./app/**/*.html')
		},
		contentBase: path.join(__dirname, 'app'),
		hot: true,
		port: 3000,
		// Allow devices on same network to access webpack on the computer
		host: '0.0.0.0'
	}
	config.mode = 'development'
} else if (currentTask == 'build') {
	config.module.rules.push({
		test: /\.js$/,
		exclude: /(node_modules)/,
		use: {
			loader: 'babel-loader',
			options: {
				presets: ['@babel/preset-env']
			}
		}
	})
	// Add the CSS Extractor for pulling out the CSS from the JS files for build (deployment)
	cssConfig.use.unshift(MiniCssExtractPlugin.loader)

	// Add the CSS Minifyer for build file
	postCSSPlugins.push(require('cssnano'))
	config.output = {
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js',
		path: path.resolve(__dirname, 'docs')
	}
	config.mode = 'production'
	config.optimization = {
		splitChunks: {chunks: 'all'}
	}
	config.plugins.push(
		// Delete existing build files before creating NEW build files
		new CleanWebpackPlugin(), 
		// Setup the CSS filename that is pulled out of the JS file
		new MiniCssExtractPlugin({filename: 'styles.[chunkhash].css'}),
		// Build own class plugin to run after build - ie. to copy the images over
		new RunAfterBuild()
	)
}

module.exports = config
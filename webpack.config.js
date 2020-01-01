const path = require('path')

const postCSSPlugins = [
	require('postcss-import'),
	require('postcss-mixins'),
	require('postcss-simple-vars'),
	require('postcss-nested'),
	require('postcss-hexrgba'),
	require('autoprefixer')
]

module.exports = {
	entry: "./app/assets/scripts/App.js",
	output: {
		filename: 'bundled.js',
		path: path.resolve(__dirname, 'app')
	},
	mode: 'development',
	watch: true,
	module: {
		rules: [
			{
				test: /\.css$/i,
				/* css-loader has added option '?url=false' so that it disables handling of images in CSS (eg. background images) */
				use: ['style-loader','css-loader?url=false', {loader: 'postcss-loader', options: {plugins: postCSSPlugins} }]
			}
		]
	}
}
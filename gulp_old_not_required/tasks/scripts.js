var gulp = require('gulp');
/* Webpack allows you to require in js files, and create modules/classes */
var webpack = require('webpack');

gulp.task('scripts', ['modernizr'], function (callback) {
	webpack(require('../../webpack.config.js'), function (error, stats) {
		if (error) {
			console.log(error.toString());
		}
		console.log(stats.toString());
		callback();
	});
});
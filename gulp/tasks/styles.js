var gulp = require('gulp');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssvars = require('postcss-simple-vars');
var nestedcss = require('postcss-nested');
var cssimport = require('postcss-import');
var mixins = require('postcss-mixins');

gulp.task('styles', function() {
	return gulp.src('./app/assets/styles/styles.css')
			.pipe(postcss([cssimport, mixins, cssvars, nestedcss, autoprefixer]))
			.on('error', function (errorInfo) {
				// Log some info on the error that occurred.
				console.log(errorInfo.toString());
				// this is if the postcss task receives an error, then this allows the gulp task to continue (without bombing out)
				this.emit('end');
			})
			.pipe(gulp.dest('./app/temp/styles'));
});
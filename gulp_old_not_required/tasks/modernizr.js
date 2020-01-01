var gulp = require('gulp');
var modernizr = require('gulp-modernizr');

gulp.task('modernizr', function () {
	// by pointing modernizr at our css and js files it will know which features to
	// test for browser capability
	return gulp.src(['./app/assets/styles/**/*.css', './app/assets/scripts/**/*.js'])
		.pipe(modernizr({
			"options" : [
				"setClasses"
			]
		}))
		.pipe(gulp.dest('./app/temp/scripts/'));
});

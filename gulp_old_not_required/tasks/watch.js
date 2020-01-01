var gulp = require('gulp');
// Gulp watch plugin is used to "watch" files for changes, hence can be used to trigger events.
var watch = require('gulp-watch');
// not requiring in the whole package - just the create method
var browsersync = require('browser-sync').create();

gulp.task('watch', function() {
	// browsersync creates a webserver on your computer - need to point it the "app" folder as
	// this is where the "index.html" file lives. (ie baseDir = 'app')
	// By default browser shows notification messages whenever CSS is injected, the "notify: false"
	// config removes this from happening.
	browsersync.init({
		notify: false,
		server : {
			baseDir: "app"
		}
	});

	// First argument to watch is the filename to watch for changes
	// Second argument is what to do when the file changes. (call an anonymous function here)
	watch('./app/index.html', function() {
		browsersync.reload();
	});

	// Watch for changes to any css files under styles folder (including ANY sub-folders)
	watch('./app/assets/styles/**/*.css', function() {
		gulp.start('cssInject');
	});

	watch('./app/assets/scripts/**/*.js', function () {
		gulp.start('scriptsRefresh');
	});
});

// this injects the CSS without even performing a refresh of the page! 
// need to use "return" here as it is "gulp.src()" is an async function
// Before running the inject - it must perform any POSTCSS required (in "styles" task)
gulp.task('cssInject', ['styles'], function () {
	return gulp.src('./app/temp/styles/styles.css')
			.pipe(browsersync.stream());
});

gulp.task('scriptsRefresh', ['scripts'], function () {
	browsersync.reload();
})
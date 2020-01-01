var gulp = require('gulp');
/* svg-sprite plugin used to generate sprite files */
var svgSprite = require('gulp-svg-sprite');
/* rename and delete file ability */
var rename = require('gulp-rename');
var del = require('del');
/* covert svg to png to support older browsers */
var svg2png = require('gulp-svg2png');

var config = {
	shape: {
		/* add some padding around the svg's as it does leave some artifacts behind */
		spacing: {
			padding: 1
		}
	},
	mode: {
		css: {
			variables: {
				replaceSvgWithPng: function () {
					return function(sprite, render) {
						return render(sprite).split('.svg').join('.png');
					}
				}
			},
			sprite: 'sprite.svg',
			/* create the css file for the positions of each icon based on the template file */
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', function () {
	return del(['./app/temp/sprite', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function () {
	// grab all the icon files, pass them through the sprite generator,
	// and put the result in app/temp/sprite
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPngCopy', ['createSprite'], function () {
	// grab to sprite svg and convert to png
	return gulp.src('./app/temp/sprite/css/*.svg')
		.pipe(svg2png())
		.pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteGraphic', ['createPngCopy'], function () {
	return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
		.pipe(gulp.dest('./app/assets/images/sprites'));
})

/* Can have dependencies in the 2nd argument (as per createSprite below) 
    This is to copy the generated sprite css file into the standard modules
    folder for css and rename it into the _sprite css filename */
gulp.task('copySpriteCSS', ['createSprite'], function() {
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function () {
	return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'createPngCopy', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);
var ngHtml2Js = require("gulp-ng-html2js");
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del');

gulp.task('html', function() {
	return gulp.src("./partials/*.html")
	.pipe(ngHtml2Js({
		moduleName: "Gdo"
	}))
	.pipe(concat("partials.min.js"))
	.pipe(uglify())
	.pipe(gulp.dest("./dist/partials"));
});

gulp.task('js', function() {
  return gulp.src([
    './src/spinkit-loader.js',
  ])
  .pipe(rename({suffix: '.min'}))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/js'))
});

gulp.task('watch', function () {
  gulp.watch('./src/*.js', ['js']);
  gulp.watch('./partials/*.html', ['html']);
});

gulp.task('clean', function(cb) {
  del(['./dist/js/*.js', './dist/partials/*.js'], cb())
});

gulp.task('default', ['clean'], function() {
    gulp.start('js', 'html', 'watch');
});
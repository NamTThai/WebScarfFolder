var gulp = require('gulp');
var concat = require('gulp-concat');
var prefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

gulp.task('default', ['copy', 'scripts', 'sass']);

gulp.task('copy', function() {
  gulp.src('./public/favicon.ico')
    .pipe(gulp.dest('./build'));
})

gulp.task('sass', function() {
  gulp.src('./public/stylesheets/*.scss')
    .pipe(sourcemaps.init())
    .pipe(prefixer())
    .pipe(sass())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/stylesheets'));
});

gulp.task('scripts', function() {
  gulp.src('./public/javascripts/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./build/javascripts'));
});

gulp.task('serve', function() {
  gulp.watch(['./public/favicon.ico', './public/stylesheets/*.scss', './public/javascripts/*.js'], ['copy', 'sass', 'scripts']);
});

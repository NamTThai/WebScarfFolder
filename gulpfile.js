var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var path = require('path');
var fs = require('fs');
var glob = require('glob');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 10',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function () {
  return gulp.src('public/stylesheets/**/*.scss')
    .pipe($.sourcemaps.init())
    .pipe($.changed('stylesheets', {extension: '.scss'}))
    .pipe($.sass())
    .pipe($.groupConcat({
      "styles.css": "**/*.css"
    }))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.if('*.css', $.cssmin()))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/' + 'stylesheets'));
});

gulp.task('scripts', function() {
  return gulp.src('public/javascripts/**/*.js')
    .pipe($.sourcemaps.init())
    .pipe($.changed('javascripts', {extension: '.js'}))
    .pipe($.concat('scripts.js'))
    .pipe($.uglify())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('build/' + 'javascripts'));

});

gulp.task('jshint', function () {
  return gulp.src([
      'public/javascripts/**/*.js',
      'public/components/**/*.html'
    ])
    .pipe($.jshint.extract())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
});

gulp.task('images', function () {
  return gulp.src('public/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('build/images'))
    .pipe($.size({title: 'images'}));
});

gulp.task('copy', function () {
  var root = gulp.src(['public/*', '!public/precache.json'], {
    dot: true
  }).pipe(gulp.dest('build'));

  var vulcanized = gulp.src(['public/components/components.html'])
    .pipe($.rename('components.vulcanized.html'))
    .pipe(gulp.dest('build/components'));

  return merge(root, vulcanized);
});

gulp.task('vulcanize', function () {
  var DEST_DIR = 'build/components';

  return gulp.src('build/components/components.vulcanized.html')
    .pipe($.vulcanize({
      dest: DEST_DIR,
      strip: true,
      inlineCss: true,
      inlineScripts: true
    }))
    .pipe(gulp.dest(DEST_DIR));
});

gulp.task('precache', function (callback) {
  glob('{components,javascripts,stylesheets}/**/*.*', {cwd: 'build'}, function(error, files) {
    if (error) {
      callback(error);
    } else {
      files.push('./', 'bower_components/webcomponentsjs/webcomponents-lite.min.js');
      fs.writeFile('build/precache.json', JSON.stringify(files), callback);
    }
  });
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['build/**', '!build', '!build/bower_components/**', '.tmp', 'logs']));
gulp.task('clean-deep', del.bind(null, ['build', '.tmp', 'logs', 'node_modules']));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles', 'scripts', 'components', 'images'], function () {
  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/styles/**/*.css'], ['styles', reload]);
  gulp.watch(['app/elements/**/*.css'], ['elements', reload]);
  gulp.watch(['app/{scripts,elements}/**/*.js'], ['jshint']);
  gulp.watch(['app/images/**/*'], reload);
});

gulp.task('node', $.shell.task(['nodemon']));

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (callback) {
  runSequence(
    ['copy', 'styles'],
    ['jshint', 'images'],
    'vulcanize', 'precache',
    callback);
});

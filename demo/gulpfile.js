var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    gulpIf     = require('gulp-if'),
    uglifycss  = require('gulp-uglifycss'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    pug        = require('gulp-pug'),
    babel      = require('gulp-babel');


var prod = true;

gulp.task('default', ['sass', 'es6', 'scripts', 'views', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
  gulp.watch('./pug/**/*', ['views']);
  gulp.watch('./js/**/*.js', ['scripts']);
  gulp.watch('../dist/es6/**/*.js', ['es6']);
});

gulp.task('sass', function () {
  return gulp.src('./styles/import.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(prod, uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    })))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./'));
});

gulp.task('es6', function() {
  return gulp.src('../dist/es6/scroll-life.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('../dist/es5/'))
});

gulp.task('scripts', function() {
  return browserify('./js/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulp.dest('./'));
});

gulp.task('views', function buildHTML() {
  return gulp.src('./pug/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./'));
});
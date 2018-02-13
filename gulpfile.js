var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    gulpIf     = require('gulp-if'),
    uglifycss  = require('gulp-uglifycss'),
    rename     = require('gulp-rename'),
    browserify = require('browserify'),
    uglify     = require('gulp-uglify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    pug        = require('gulp-pug'),
    babel      = require('gulp-babel');


var prod = true;

gulp.task('default', ['sass', 'scripts', 'es6', 'views', 'watch']);

gulp.task('watch', function () {
  gulp.watch('./styles/**/*.scss', ['sass']);
  gulp.watch('./js/es5/**/*.js', ['scripts']);
  gulp.watch('./js/es6/**/*.js', ['es6', 'scripts']);
  gulp.watch('./views/**/*', ['views']);
});

gulp.task('sass', function () {
  return gulp.src('./styles/import.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpIf(prod, uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
    })))
    .pipe(rename('main.css'))
    .pipe(gulp.dest('./build'));
});

gulp.task('scripts', function() {
  return browserify('./js/es5/app.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulp.dest('./build'));
});

gulp.task('es6', function() {
  return gulp.src('./js/es6/**/*.js')
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('./js/es5/components'))
});

gulp.task('views', function buildHTML() {
  return gulp.src('./views/index.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('./build'));
});
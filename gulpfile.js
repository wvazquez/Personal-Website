'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      del = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create(),
      runSequence = require('run-sequence');


// Compile sass into CSS & auto-inject into browsers
gulp.task('compileSass', () => {
  return gulp.src('styles/app.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

gulp.task('compilePug', () => {
  return gulp.src('views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

gulp.task('concatScripts', () => {
  return gulp.src(['js/sticky.js'])
      .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
  return gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('dist/js'));
});
gulp.task('watch::js', ['minifyScripts'], function (done) {
    browserSync.reload();
    done();
});

gulp.task('build', ['minifyScripts', 'compileSass', 'compilePug'], () => {
  return gulp.src(['images/**'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  del(['dist']);
});

gulp.task('clean-build', () => {
  runSequence('clean', 'build');
});

gulp.task('serve', ['clean-build'], () => {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch('styles/**/*.scss', ['compileSass']);
    gulp.watch('views/**', ['compilePug']);
    gulp.watch('js/*', ['watch::js']);
});

gulp.task('default', () => {
  gulp.start('serve');
});

'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      del = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      pug = require('gulp-pug');

gulp.task('concatScripts', () => {
  return gulp.src(['js/sticky.js'])
      .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('js'));
});

gulp.task('minifyScripts', ['concatScripts'], () => {
  return gulp.src('js/app.js')
      .pipe(uglify())
      .pipe(rename('app.min.js'))
      .pipe(gulp.dest('js'));
});

gulp.task('compileSass', () => {
  return gulp.src('styles/app.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('css'));
});

gulp.task('compilePug', () => {
  return gulp.src('views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', () =>{
  gulp.watch('styles/**/*.scss', ['compileSass']);
  gulp.watch('views/**', ['compilePug']);
  gulp.watch('styles/**', ['minifyScripts']);
});

gulp.task('build', ['minifyScripts', 'compileSass'], () => {
  return gulp.src(['css/app.css*', 'js/app.js', 'images/**', 'views/index.pug'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  del(['dist', 'css/**', 'js/app*.js*']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass');


gulp.task('compileSass', () => {
  gulp.src('public/styles/app.scss')
  .pipe(sass())
  .pipe(gulp.dest('css'));
});

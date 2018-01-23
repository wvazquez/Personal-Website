'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass')
      del = require('del');


gulp.task('compileSass', () => {
  return gulp.src('public/styles/app.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', () =>{
  gulp.watch('public/styles/**/*.scss', ['compileSass']);
});

gulp.task('build', ['compileSass'], () => {
  return gulp.src(['css/app.css'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', () => {
  del('dist');
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

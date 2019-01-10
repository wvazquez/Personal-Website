'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      del = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create();



// Compile sass into CSS & auto-inject into browsers
function css(done) {
  return gulp.src('styles/app.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
        done();
}

function html(done) {
  return gulp.src('views/index.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
        done();
}

function js(done){
  return gulp.src(['js/sticky.js'])
      .pipe(maps.init())
      .pipe(concat('app.js'))
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/js'))
      ;
      done();
}

function images(done){
  return gulp.src('images/**', { base: './'})
          .pipe(gulp.dest('dist'));
          done();
}
function reload(){
  return browserSync.reload();
}
function watch_files(){
  gulp.watch('styles/**/*.scss', css);
  gulp.watch('views/**', html);
  gulp.watch('js/*', gulp.series(js, reload));
}

function browser_sync(done){
  browserSync.init({
      server: "./dist/"
  });
  done();
}

function clean(done){
  del(['dist']);
  done();
}

gulp.task("css", css);
gulp.task("html", html);
gulp.task("images", images);
gulp.task("js", js);
gulp.task('clean', clean);

gulp.task('default', gulp.parallel(css, html, images, js));
gulp.task('watch', gulp.series(browser_sync, watch_files));

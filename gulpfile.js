'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      del = require('del'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      cleanCSS = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      maps = require('gulp-sourcemaps'),
      pug = require('gulp-pug'),
      browserSync = require('browser-sync').create();



// Compile sass into CSS & auto-inject into browsers
function css(done) {
  return gulp.src('styles/app.scss')
        .pipe(maps.init())
        .pipe(sass())
        .pipe(cleanCSS())
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
      .pipe(uglify())
      .pipe(maps.write('./'))
      .pipe(gulp.dest('dist/js'));
      done();
}

function images(done){
  return gulp.src('images/**', { base: './'})
          .pipe(gulp.dest('dist'));
          done();
}
function reload(done){
  browserSync.reload();
  done();
}
function watch_files(){
  gulp.watch('styles/**/*.scss', css);
  gulp.watch('views/**', html);
  gulp.watch('js/**', gulp.series(js, reload));
  gulp.watch('images/**', images);
}

function browser_sync(){
  browserSync.init({
      server: "./dist/"
  });
}

function clean(done){
  return del(['dist']);
  done();
}

gulp.task("css", css);
gulp.task("html", html);
gulp.task("images", images);
gulp.task("js", js);
gulp.task('clean', clean);


gulp.task('watch', gulp.parallel(browser_sync, watch_files));
gulp.task('default', gulp.series(clean, gulp.parallel(css, html, images, js)));

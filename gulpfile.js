var gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del');

var paths = {
  styles: {
    src: 'src/assets/scss/**/*.scss',
    dest: 'build/assets/css/'
  },
  js: {
    src: 'src/assets/js/*.js',
    dest: 'build/assets/js/'
  },
  vendor: {
    js: 'src/assets/vendor/js/*.js',
    css: 'src/assets/vendor/css/*.css',
  }
}

function clean() {
  return del([ 'build/assets' ]);
}

function vendorJs() {
  return gulp.src(paths.vendor.js)
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}

function watch() {
  gulp.watch(paths.vendor.js, vendorJs);
}

exports.clean = clean;
exports.vendorJs = vendorJs;
exports.watch = watch;


var build = gulp.series(clean, vendorJs);


gulp.task('build', build);
gulp.task('default', build);

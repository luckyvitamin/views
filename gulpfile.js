var gulp = require('gulp'),
    // babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
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

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(gulp.dest(paths.styles.dest));
}

function js() {
  return gulp.src(paths.vendor.js)
    .pipe(uglify())
    .pipe(concat('bundle.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}

function vendorJs() {
  return gulp.src(paths.vendor.js)
    .pipe(uglify())
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest(paths.js.dest));
}

function watch() {
  gulp.watch(paths.vendor.js, vendorJs);
  gulp.watch(paths.styles.src, styles);
  gulp.watch(paths.js.src, js);
}

exports.clean = clean;
exports.styles = styles;
exports.js = js;
exports.vendorJs = vendorJs;
exports.watch = watch;

var build = gulp.series(clean, vendorJs, gulp.parallel(styles, js), watch);

gulp.task('build', build);
gulp.task('default', build);

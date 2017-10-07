var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

var browserify  = require('browserify');
var babelify    = require('babelify');
var source      = require('vinyl-source-stream');
var buffer      = require('vinyl-buffer');
var uglify      = require('gulp-uglify');
var sourcemaps  = require('gulp-sourcemaps');

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.stream());
});

gulp.task('babel', function() {
    return browserify({entries: './src/main.js', debug: true})
        .transform("babelify", { presets: ["es2015"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream());
});
 
gulp.task('default', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
  gulp.watch('./src/**/*.js', ['babel']);
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch("./**/*.html").on('change', browserSync.reload);
});
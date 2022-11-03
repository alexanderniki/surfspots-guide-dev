const { src, dest } = require('gulp');
const { gulpfile } = require('gulp-cli/lib/shared/cli-options');
const concat = require('gulp-concat');
const gulp = require('gulp');


gulp.task('code', function() {
    return gulp.src([
        './src/app/components/**/*.js',
        './src/app/*.js',
        './src/app/utils/**/*.js',
        './src/app/utils/*.js',
    ])
    .pipe(concat('app.js'))
    .pipe(dest('./dist/app'));
});


gulp.task('style', function() {
    return gulp.src([
        './src/app/components/**/*.css',
        './src/app/*.css'
    ])
    .pipe(concat('style.css'))
    .pipe(dest('./dist/app'));
});


gulp.task('page', function() {
    return gulp.src([
        './src/*.html'
    ])
    .pipe(dest('./dist'));
});


gulp.task('data', function() {
    return gulp.src([
        './src/app/data/data.js'
    ])
    .pipe(dest('./dist/app'));
});


gulp.task('media', function() {
    return gulp.src([
        './src/media/*.*'
    ])
    .pipe(dest('./dist/media'));
});


gulp.task('build', ['code', 'style', 'page', 'data', 'media']);
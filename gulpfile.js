const { src, dest } = require('gulp');
const { gulpfile } = require('gulp-cli/lib/shared/cli-options');
const concat = require('gulp-concat');
const gulp = require('gulp');


gulp.task('code', function() {
    return gulp.src([
        './src/app/*.js',
        './src/app/components/*.js',
        './src/app/components/**/*.js',
        './src/app/utils/**/*.js',
        './src/app/utils/*.js',
        './src/app/models/*.js',  // Delete if doesn't work
        './src/app/models/**/*.js',
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

gulp.task('pwa', function() {
    return gulp.src([
        'manifest.json',
    ])
    .pipe(dest('./dist'));
});


gulp.task('build', ['code', 'style', 'page', 'data', 'media', 'pwa']);
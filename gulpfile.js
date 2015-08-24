var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('minifyjs', function(){
    return gulp.src('src/*.js')
        .pipe(concat('smart.js'))
        .pipe(gulp.dest('build/0.1'))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('build/0.1/'));
});

gulp.task('default', function(){
    gulp.start('minifyjs');
});
var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var header = require('gulp-header');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var pkg = require('./package.json');
var banner = ['/**',
  ' * <%= pkg.name %> - <%= pkg.description %>',
  ' * @version v<%= pkg.version %>',
  ' * @author <%= pkg.author %>',
  ' * @link <%= pkg.homepage %>',
  ' * @license <%= pkg.license %>',
  ' */',
  ''].join('\n');

var projectRoot = '../../ued/repos/sys/smart/';

gulp.task('minifyjs', function(){
    return gulp.src(['src/smart.core.js','src/smart.dom.js','src/smart.event.js'])
        .pipe(concat('smart.js'))
        .pipe(header(banner, { pkg : pkg } ))
        .pipe(gulp.dest('build/'+pkg.version))
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify({preserveComments: 'some'}))
        .pipe(gulp.dest('build/'+pkg.version))
        .pipe(gulp.dest(projectRoot + pkg.version));
});

gulp.task('default', function(){
    gulp.start('minifyjs');
});
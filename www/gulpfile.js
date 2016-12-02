var gulp = require('gulp')
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var nodemon = require('gulp-nodemon');

var nodemonConfig = require('./nodemon.json');
var tsProject = ts.createProject('tsconfig.json');

gulp.task('build', () => {
    var tsResult = gulp.src('src/**/*.ts')
        .pipe(sourcemaps.init()) // This means sourcemaps will be generated
        .pipe(tsProject);

    return tsResult.js
        .pipe(sourcemaps.write()) // Now the sourcemaps are added to the .js file
        .pipe(gulp.dest('dist/'));
});

gulp.task('serve', nodemonConfig.tasks, function(){
  nodemon(nodemonConfig);
});

gulp.task('default', ['serve']);
var gulp = require('gulp');
var RevAll = require('gulp-rev-all');

gulp.task('revall', function () {

  gulp
    .src('predistribution/**')
    .pipe(RevAll.revision({ 
      dontRenameFile: ['.html'],
      dontUpdateReference: ['.html'] 
    }))
    .pipe(gulp.dest('public'));

});
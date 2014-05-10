
var gulp = require('gulp'); 


gulp.task('default',function(){

gulp.src('./bower_components/jquery/jquery.js')
  .pipe(gulp.dest('./build/js/'));

});
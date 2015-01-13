var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var del = require('del');


var articles = require('./buildscripts/articles');
var pages = require('./buildscripts/pages');


gulp.task('build', ['clean', 'assets', 'sass','uglify','articles', 'pages' ], function() {});
gulp.task('fe', ['assets', 'sass','uglify'], function() {});

gulp.task('default', function(){

  var watcher = gulp.watch('./src/**/*', ['build']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

});

gulp.task('uglify', ['clean'], function(){
  var stream=gulp.src(['./src/bower_components/jquery/jquery.js','./src/js/**/*.js'])
  .pipe(gulp.dest('./build/js'));
  return stream;
});



/*
.pipe(uglify('main.js', {
      mangle: false,
      compress:false,
      output: {
        beautify: true
      }
    }))
 */

gulp.task('sass', ['clean'],  function() {
  var stream = gulp.src('./src/style/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));
  return stream;
});

gulp.task('assets', ['clean'], function() {
  var stream = gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
  return stream;
});

gulp.task('clean', function(cb) {
  // return gulp.src('./build/**/*', {
  //   read: false
  // }).pipe(clean());
  del('./build/**/*',cb );

});

// gulp.task('libjs',function(){
//   var stream = gulp.src([])
// })
// 



gulp.task('pages', ['clean'],  function() {

  pages(function(err, files){
    if(err){
      return console.log(err);
    }
    // console.log(files);
  });


});


gulp.task('articles', ['clean'],  function() {

 articles(function(err, files){
    if(err){
      return console.log(err);
    }
    // console.log(files);
  });
});
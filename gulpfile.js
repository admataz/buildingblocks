var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

var articles = require('./buildscripts/articles');
var pages = require('./buildscripts/pages');

gulp.task('default', ['clean', 'assets', 'sass','uglify', 'pages', 'articles'], function() {});
gulp.task('fe', ['assets', 'sass','uglify'], function() {});

gulp.task('uglify',function(){
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

gulp.task('sass', function() {
  var stream = gulp.src('./src/style/main.scss')
    .pipe(sass())
    .pipe(gulp.dest('./build/css'));
  return stream;
});

gulp.task('assets', function() {
  var stream = gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./build/assets'));
  return stream;
});

gulp.task('clean', function() {
  gulp.src('./build/**/*', {
    read: false
  })
    .pipe(clean());
});

// gulp.task('libjs',function(){
//   var stream = gulp.src([])
// })
// 



gulp.task('pages', function() {

  pages(function(err, files){
    if(err){
      return console.log(err);
    }
    console.log(files);
  });


});


gulp.task('articles', function() {

 articles(function(err, files){
    if(err){
      return console.log(err);
    }
    console.log(files);
  });
});
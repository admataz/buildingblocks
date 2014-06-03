var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');

var gA = require('./lib/generateArticles');

gulp.task('default', ['clean', 'assets', 'sass','uglify'], function() {

});

gulp.task('uglify',function(){
  var stream=gulp.src(['./src/bower_components/jquery/jquery.js','./src/js/**/*.js'])
  .pipe(uglify('main.js', {
      mangle: false,
      output: {
        beautify: true
      }
    }))
  .pipe(gulp.dest('./build/js'));
  return stream;
});

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

gulp.task('articles', function() {
  gA({}, function(err, path) {
    if (err) {
      return console.log(err);
    }
    console.log(path);
  });
});
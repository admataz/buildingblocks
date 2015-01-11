var a = require('./buildscripts/articles');
var p = require('./buildscripts/pages');

a(function(err, files){
  if(err){
    return console.log(err);
  }
  console.log(files);
});


p(function(err, files){
  if(err){
    return console.log(err);
  }
  console.log(files);
});
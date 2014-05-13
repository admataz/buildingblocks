/**
 * generate the client list on the home page
 */
// var clientlist = require('./lib/clientList');
// clientlist(function(err, template){
//   if(err){
//     return console.log(err);
//   }
//   console.log(template);
// });

/**
 * generate a single page
 */
// var pageGen = require('./lib/generatePage');
// pageGen({contentPath:'./src/content/case-studies/code-beauty-art.md'},function(err,path){
//   if (err) {
//     return console.log(err);
//   }
//   console.log(path);
// });


/**
 * generate all articles from the src dir
 * @type {[type]}
 */
var gA = require('./lib/generateArticles');
gA({}, function(err, path){
  if(err){
    return console.log(err);
  }

  console.log(path);

});
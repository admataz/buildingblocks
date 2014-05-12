var clientlist = require('./lib/clientList');
var pageGen = require('./lib/generatePage');


// clientlist(function(err, template){
//   if(err){
//     return console.log(err);
//   }
//   console.log(template);
// });


pageGen({contentPath:'./src/content/case-studies/code-beauty-art.md'},function(err,path){
  if (err) {
    return console.log(err);
  }


  console.log(path);



});
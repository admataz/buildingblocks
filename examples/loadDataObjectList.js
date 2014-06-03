/**
 * get a list/object of json document paths and turn them into a compiled objects
 */

var fs = require('fs');
var loadDataObjectList = require('./lib/loadDataObjectList');

fs.readdir('./src/content/data/', function(err, files) {
  files = files.map(function(itm,i){
    return './src/content/data/'+itm;
  });


  loadDataObjectList(files, function(err, results){
    console.log(results);
  });
});
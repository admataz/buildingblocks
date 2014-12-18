/**
 * get a list/object of markdown documents and turn them into `meta-marked` objects
 */
var fs = require('fs');
var loadDocumentList = require('./lib/loadDocumentList');
fs.readdir('./src/content/case-studies/', function(err, files) {
  files = files.map(function(itm, i) {
    return './src/content/case-studies/' + itm;
  });
  loadDocumentList(files, function(err, results) {
    console.log(results);
  });
});
var fs = require('fs');
var path = require('path');

var async = require('async');
var jf = require('jsonfile');

var compilePage = require('../lib/compilePage');
var writeHtmlPage = require('../lib/writeHtmlPage');


var options = jf.readFileSync('./src/content/pagedata/_default.json');

module.exports = function(cb) {

  fs.readdir('./src/content/case-studies', function(err, files) {
    if (err) {
      return cb(err);
    }

    files = files.map(function(itm, i) {
      if (path.extname(itm) === ".md") {
        return itm;
      }
    });
    async.each(files, function(i, cb) {
      options.docs.page = './src/content/case-studies/' + i;
      compilePage(options, function(err, result) {
        if (err) {
          return console.log(err);
        }
        writeHtmlPage('./build/articles/' + path.basename(i, '.md'), result, function(err, result) {
          cb();
        });
      });
    }, 
    function(err){
      return cb(err, files);
    });
  });

};
/**
 * compile articles html from specific directory of markdown files
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var jf = require('jsonfile');
var compilePage = require('../lib/compilePage');
var writeHtmlPage = require('../lib/writeHtmlPage');
// set the default options from the config file
var options = jf.readFileSync('./src/content/pagedata/_default.json');

// TODO: allow custom options to merge with default


module.exports = function(cb) {
// read the directory containing the markdown
  fs.readdir('./src/content/case-studies', function(err, files) {
    if (err) {
      return cb(err);
    }
    // get a list of markdown files
    files = files.map(function(itm, i) {
      if (path.extname(itm) === ".md") {
        return itm;
      }
    });

    // for each file - do the compilation
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
    }, function(err) {
      return cb(err, files);
    });
  });
};
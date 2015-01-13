/**
 * compile articles html from specific directory of markdown files
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var jf = require('jsonfile');
var compilePage = require('../lib/compilePage');
var writeHtmlPage = require('../lib/writeHtmlPage');

var indexPages = require('../lib/indexPages');
var loadDocument = require('../lib/loadDocument');

// set the default options from the config file
var options = jf.readFileSync('./src/content/pagedata/_default.json');

// TODO: allow custom options to merge with default
options.templates.page = "./src/templates/page_article.handlebars";

function doPageIndex(src, dest, cb){
  loadDocument(src,function(err,doc){
    indexPages({contentPath:'articles/', fileName: dest, doc:doc, systemPath: './build/'}, function(err){
      cb();
    });
  });


}

module.exports = function(cb) {
// read the directory containing the markdown
  fs.readdir('./src/content/articles', function(err, files) {
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
    async.eachSeries(files, function(i, cb) {
      options.docs.page = './src/content/articles/' + i;

      compilePage(options, function(err, result) {
        if (err) {
          return console.log(err);
        }
        var dest = './build/articles/' + path.basename(i, '.md');
        writeHtmlPage(dest, result, function(err, filePath) {
          if(err){
            return console.log(err);
          }
          doPageIndex(options.docs.page, filePath, function(err){
            if(err){
              return console.log(err);
            }
            cb();
          });
        });
      });
    }, function(err) {

      


      return cb(err, files);
    });
  });
};
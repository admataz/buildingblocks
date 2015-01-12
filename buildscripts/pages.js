/**
 * generate static html for all pages 
 */
var fs = require('fs');
var path = require('path');
var async = require('async');
var jf = require('jsonfile');
var _ = require('lodash');
var compilePage = require('../lib/compilePage');
var writeHtmlPage = require('../lib/writeHtmlPage');
var options = jf.readFileSync('./src/content/pagedata/_default.json');

module.exports = function(cb) {
  fs.readdir('./src/content/pagedata', function(err, files) {
    if (err) {
      return cb(err);
    }
    files = files.filter(function(itm, i) {
      if (path.extname(itm) === ".json" && itm != '_default.json') {
        return true;
      }
    });

    // need to do this in series - otherwise we lose the scope 
    async.eachSeries(files, function(i, callback) {
      jf.readFile('./src/content/pagedata/' + i, function(err, pageOptions) {
        pageOptions = _.merge(options, pageOptions);
        compilePage(pageOptions, function(err, result) {
          if (err) {
            return console.log(err);
          }
          writeHtmlPage('./build/' + pageOptions.route, result, function(err, result) {
            callback();
          });
        });
      });
    }, function(err) {
      return cb(err, files);
    });
  });
};
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
    var files = fs.readdirSync('./src/content/pagedata');
    files = files.filter(function(itm, i) {
      if (path.extname(itm) === ".json" && itm != '_default.json') {
        return true;
      }
    });
    // need to do this in series - otherwise we lose the scope 
    async.eachSeries(files, function(i, callback) {
        var pageOptions = {};
        pageOptions = jf.readFileSync('./src/content/pagedata/' + i);
        pageOptions = _.merge({}, options, pageOptions);
        compilePage(pageOptions, function(err, result) {
          if (err) {
            return console.log(err);
          }
          writeHtmlPage('./build/' + pageOptions.route, result, function(err, result) {
            callback();
          });
      });
    }, function(err) {
      return cb(err, files);
    });
};
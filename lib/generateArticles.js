var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var genPage = require('./generatePage');

var options = {};
var defaults = {
  srcDir: './src/content/case-studies/',
  destDir: './build/articles/'
};

module.exports = function(opts, cb) {

  if (!opts) {
    opts = {};
  }
  options = _.extend(defaults, opts);

  fs.readdir(options.srcDir, function(err, files) {
    if (err) {
      return cb(err);
    }

    function next(err, p) {
      if (files.length) {
        processFile(files.shift());
      } else {
        cb(err, 'done processing articles');
      }
    }

    function processFile(p) {
      if (path.extname(p) === ".md") {
        genPage({
            contentPath: options.srcDir + p,
            destDir: options.destDir
          },
          next
        );
      }
    }

    processFile(files.shift());

  });

};
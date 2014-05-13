var fs = require('fs');
var jf = require('jsonfile');
var metaMarked = require('meta-marked');
var handlebars = require('handlebars');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');
var loadGlobals = require('./loadGlobals');

var options = {};
var defaults = {
  htmlTemplate: './src/templates/html.handlebars',
  pageTemplate: './src/templates/page.handlebars',
  destDir: './build/articles/'
};
var globalContent = {};




function writeHtml(filename, output, cb) {
  mkdirp(options.destDir + filename, function(err, made) {
    if (err) {
      return cb(err);
    }
    fs.writeFile(options.destDir + filename + '/index.html', output, function(err) {
      if (err) {
        return cb(err);
      }
      cb(err, options.destDir + filename + '/index.html');
    });
  });
}



function generateHtml(doc, pageContent, cb) {
  fs.readFile('./src/templates/html.handlebars', {
    encoding: 'utf8'
  }, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    var htmlContent = template({
      page: doc,
      pageContent: pageContent
    });

    cb(err, htmlContent);
  });

}

function generatePage(options, doc, cb) {
  fs.readFile('./src/templates/page.handlebars', {
    encoding: 'utf8'
  }, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    var pageContent = template({
      page: doc,
      global:globalContent
    });
    generateHtml(doc, pageContent, cb);
  });
}

function loadContent(contentPath, cb) {
  fs.readFile(contentPath, {
    encoding: 'utf8'
  }, function(err, obj) {
    if (err) {
      return cb(err);
    }
    cb(err, metaMarked(obj));
  });
}


function startPages(options, globals, cb){
  var filename = path.basename(options.contentPath, '.md');
  loadContent(options.contentPath, function(err, doc) {
    if (err) {
      return cb(err);
    }
    generatePage(options, doc, function(err, output) {
      if (err) {
        return cb(err);
      }
      writeHtml(filename, output, cb);
    });

  });
}


module.exports = function(opts, cb) {
  if (!opts) {
    opts = {};
  }

  options = _.extend(defaults, opts);

  if (!options.contentPath) {
    return cb(new Error('you must provide a valid path to content'));
  }

  loadGlobals('',function(err,obj){
    if(err) return cb(err);

    globalContent = obj;

    // console.log(obj.get_in_touch_text);
    // return;
    startPages(options, obj, cb);

  });
 

};



var fs = require('fs');
var metaMarked = require('meta-marked');
var handlebars = require('handlebars');
var _ = require('lodash');
var path = require('path');
var mkdirp = require('mkdirp');

var defaults = {
  htmlTemplate: './src/templates/html.handlebars',
  pageTemplate: './src/templates/page.handlebars'
};


function loadTemplate(data, cb) {
  var tdata = {
    clients: data
  };
  fs.readFile('./src/templates/page.handlebars',{encoding:'utf8'}, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    cb(err, template(tdata));
  });
}


function generateHtml(page, pageContent, cb){
  
  fs.readFile('./src/templates/html.handlebars',{encoding:'utf8'}, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    var htmlContent = template({page:page, pageContent:pageContent});

    cb(err, htmlContent);
  });

}


function generatePage(options, doc, cb){

  fs.readFile('./src/templates/page.handlebars',{encoding:'utf8'}, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    var pageContent = template({page:doc});
    generateHtml(doc, pageContent, cb);
    // cb(err, template({page:doc}));
  });

}



function loadContent(contentPath,  cb) {
  fs.readFile(contentPath, {encoding:'utf8'}, function(err, obj) {
    if (err) {
      return cb(err);
    }
    
    cb(err, metaMarked(obj));
  });
}



module.exports = function(options, cb) {

  if (!options){
    options = {};
  }

  options = _.extend(defaults, options);

  if(!options.contentPath){
    return cb(new Error('you must provide a valid path to content'));
  }

  var filename = path.basename(options.contentPath, '.md');



  loadContent(options.contentPath, function(err,doc){
    if(err){
      return console.log(err);
    }

    generatePage(options, doc, function(err, output){
        if(err){
          return console.log(err);
        }

        mkdirp('./build/articles/'+filename, function(err, made){
          if(err){
            return console.log(err);
          }

          fs.writeFile('./build/articles/'+filename+'/index.html', output, function(err){
            if(err){
              return cb(err);
            }
            cb(err, './build/articles/'+filename+'/index.html')
          });

        });


    });


  });

};

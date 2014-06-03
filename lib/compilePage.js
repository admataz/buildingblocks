var async = require('async');

var common = require('./commonContent');
var loadDataObjectList = require('./loadDataObjectList');
var loadDocumentList = require('./loadDocumentList');
var loadJsonElements = require('./loadJsonElements');
var loadTemplate = require('./loadTemplate');

/*
opts = {
  docs: {
    id: path.md,
    id2: path2.md
    …
  }, 
  data: {
    id: path.json
    id2: path2.json
    …
  },
  elements: { 
    id: {
      template: element_template.hbs
      data: path.json
    },
    id2: {
      template: element_template2.hbs
      data: path2.json
    },
    …
  }
  templates:{
    page: pagetemplate.hbs,
    html: htmltemplate.hbs
  } 

  }
 */

module.exports = function(opts, cb) {

  // load the data and content in any order
  async.parallel({
      docs: function(callback) {
        loadDocumentList(opts.docs, callback);
      },
      elements: function(callback) {
        loadJsonElements(opts.elements, callback);
      },
      data: function(callback) {
        loadDataObjectList(opts.data, callback);
      }
    },

    // when all the data and content is loaded - combine them into the templates
    function(err, result) {
      loadTemplate(result, opts.templates.page, function(err, pageOutput) {
        result.pageContent = pageOutput;
        loadTemplate(result, opts.templates.html, cb);
      });

    }
  );

};
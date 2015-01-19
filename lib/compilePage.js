/**
 *
 *   Compile a specific json object structure that contains all the page information into a static html page
 *
 *
 *   ```javascript
 *
 *   opts = {
 *   docs: {
 *     id: path.md,
 *     id2: path2.md
 *     …
 *   },
 *   data: {
 *     id: path.json
 *     id2: path2.json
 *     …
 *   },
 *   elements: {
 *     id: {
 *       template: element_template.hbs
 *       data: path.json
 *     },
 *     id2: {
 *       template: element_template2.hbs
 *       data: path2.json
 *     },
 *     …
 *   }
 *   templates:{
 *     page: pagetemplate.hbs,
 *     html: htmltemplate.hbs
 *   }
 
 *   }
 *
 *   ```
 *
 *
 */
var async = require('async');
var common = require('./commonContent');
var loadDataObjectList = require('./loadDataObjectList');
var loadDocumentList = require('./loadDocumentList');
var loadJsonElements = require('./loadJsonElements');
var loadTemplate = require('./loadTemplate');
var _ = require('lodash');

module.exports = function(opts, cb) {
  if (!opts.templates) {
    return cb(new Error('you need to define templates'));
  }
  if (!opts.templates.page) {
    return cb(new Error('you need to define a page template'));
  }
  if (!opts.templates.html) {
    return cb(new Error('you need to define an html template'));
  }
  


  var resultsObj = {};
/**
 * go through the data for a page and put it together into a single results object for outputing the page
 */
  async.parallel([
      function(callback) {
        if (!opts.customBuild) {
          return callback();
        }
        custom = require(opts.customBuild);
        custom(function(err, result) {
          resultsObj.customBuild = result;
          callback();
        });
      },


      function(callback) {
        if (!opts.elements) {
          return callback();
        }
        loadJsonElements(opts.elements, function(err, result) {
            resultsObj.elements = result;
          callback();
        });
      },

      function(callback) {
        if (!opts.data) {
          return callback();
        }
        loadDataObjectList(opts.data, function(err, result) {
          resultsObj.data = result;
          callback();
        });
      },

      function(callback) {
        if (!opts.docs) {
          return callback();
        }
        loadDocumentList(opts.docs, function(err, result) {
          resultsObj.docs = result;
          callback();
        });
      }



    ],
    // when all the data and content is loaded - combine them into the templates
    function(err, result) {
      loadTemplate(resultsObj, opts.templates.page, function(err, pageOutput) {
        resultsObj.pageContent = pageOutput;
        loadTemplate(resultsObj, opts.templates.html, cb);
      });
    });
};
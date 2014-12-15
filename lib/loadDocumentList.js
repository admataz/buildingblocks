/**
 * Load a supplied list of documents, convert them to 
 */

var async = require('async');
var loadDocument = require('./loadDocument');


module.exports = function loadDocs(docs, cb){
  var results = {};

  // loop through all the items in the object (via the keys)
  async.each(Object.keys(docs), function(key,cb){
    // load the document
    loadDocument(docs[key], function(err,docobject){
      results[key] = docobject;
      cb();
    });
  }, 
  function(err){
    return cb(err, results);
  });
};



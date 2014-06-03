var fs = require('fs');
var jf = require('jsonfile');
var _ = require('lodash');

var options = {};
var defaults = {
  contentPath: './build/articles/'
};



module.exports = function(opts, cb){
  var indexData;

  if (!opts) {
    opts = {};
  }

  options = _.extend(defaults, opts);

  if (!options.contentPath) {
    return cb(new Error('you must provide a valid path to content'));
  }
   if (!options.fileName) {
    return cb(new Error('you must provide a valid filename to content'));
  }
   if (!options.doc) {
    return cb(new Error('you must provide a data to index content'));
  }

  if(fs.existsSync(options.contentPath+'index.json')){
    indexData = jf.readFileSync(options.contentPath+'index.json');
  }  else  {
    indexData = [];
  }


  options.doc.meta.fileName = options.fileName;
  indexData.push(options.doc.meta);

  indexData = _.filter(indexData, function(){
    return fs.existsSync(options.contentPath+options.fileName);
  });

  indexData = _.sortBy(indexData,function(itm){
    return -(new Date(itm.date));
  });

  jf.writeFileSync(options.contentPath+'index.json', indexData);


};
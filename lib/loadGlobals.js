var jf = require('jsonfile');
var defaultPath = './src/content/data/global-content.json';

module.exports = function(path, cb){
  if(!path){
    path = defaultPath;
  }
  jf.readFile(path, function(err,obj){
    if(err){
      return cb(err);
    }

    cb(err, obj);

  });


};
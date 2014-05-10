var fs = require('fs');
var marked = require('marked');
var handlebars = require('handlebars');



module.exports = function(options, cb) {



  fs.readFile(file_src, function(err, file) {
    if (err) {
      cb(err);
      return;
    }

  });


};

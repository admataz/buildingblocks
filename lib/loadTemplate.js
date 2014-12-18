/**
 * loads and compiles a handlebars template with supplied data
 */
var handlebars = require('handlebars');
var _ = require('lodash');

module.exports = function(dataIn, templateIn, cb) {
  if (!dataIn) {
    dataIn = {};
  }
  if (!templateIn) {
    return cb(new Error('No source template provided'));
  }
  fs.exists(templateIn, function(exists) {
    if (!exists) {
      return cb(new Error('The source template "' + templateIn + '" does not exist on the system.'));
    }
    fs.readFile(templateIn, {
      encoding: 'utf8'
    }, function(err, str) {
      if (err) {
        return cb(err);
      }
      var templateFunc = handlebars.compile(str);
      var output = templateFunc(dataIn);
      cb(err, output);
    });
  });
};
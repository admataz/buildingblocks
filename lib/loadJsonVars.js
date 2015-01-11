/**
 * load a json file and turn it into a javascript object - merge with  a global object if specified
 *
 * TODO: decouple the global object functionality - make it an option set outside of this function
 */
var jf = require('jsonfile');
var common = require('./commonContent');
var _ = require('lodash');
module.exports = function(path, makeGlobal, cb) {
  if (!path) {
    return cb(new Error('The file name was not supplied'));
  }
  jf.readFile(path, function(err, obj) {
    if (err) {
      return cb(err);
    }
    if (makeGlobal) {
      common = _.merge(common, obj);
    }
    cb(err, obj);
  });
};
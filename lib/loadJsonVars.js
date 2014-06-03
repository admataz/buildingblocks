var jf = require('jsonfile');
var common = require('./commonContent');
var _ = require('lodash');

module.exports = function(path, makeGlobal, cb) {
  if (!path) {
    return cb(new Error('The file name was not suppied'));
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
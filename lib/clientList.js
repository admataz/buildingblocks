/**
 * this module compiles the client list 
 */
var fs = require('fs');
var marked = require('marked');
var handlebars = require('handlebars');
var jf = require('jsonfile');


function loadTemplate(data, cb) {
  var tdata = {
    clients: data
  };
  fs.readFile('./src/templates/elements/client_list.handlebars', function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str.toString());
    cb(err, template(tdata));
  });
}

function loadData(cb) {
  jf.readFile('./src/content/data/client-list.json', function(err, obj) {
    if (err) {
      return cb(err);
    }
    cb(err, obj);
  });
}

module.exports = function(cb) {
  loadData(function(err, obj) {
    if (err) {
      return console.log(err);
    }

    loadTemplate(obj, function(err, tpl) {
      cb(err, tpl);
    });

  });

};
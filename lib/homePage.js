var fs = require('fs');
var marked = require('marked');
var handlebars = require('handlebars');
var jf = require('jsonfile');
var clientsList = require('./clientList');



function loadTemplate(data, cb) {
  var tdata = {
    clients: data
  };
  fs.readFile('./src/templates/page_home.handlebars', function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str.toString());
    cb(err, template(tdata));
  });
}

function loadData(cb) {
  clientsList(function(err, output){
    // console.log(output);
    cb(err, output);
  });
}

module.exports = function() {
  loadData(function(err, obj) {
    if (err) {
      return console.log(err);
    }

    loadTemplate(obj, function(err, tpl) {
      fs.writeFile('./build/index.html',tpl);
    });

  });

};




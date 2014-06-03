/**
 * get a list/object of json document paths and turn them into a compiled objects
 */

var fs = require('fs');
var loadJsonElements = require('./lib/loadJsonElements');


loadJsonElements({'test1': {'data':'./src/content/data/client-list.json', 'template':'./src/templates/elements/client_list.handlebars'}}, function(err, output) {
  console.log(output);
});
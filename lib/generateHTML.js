var fs = require('fs');





module.exports = function generateHtml(doc, pageContent, cb) {
  fs.readFile(options.htmlTemplate, {
    encoding: 'utf8'
  }, function(err, str) {
    if (err) {
      return cb(err);
    }
    var template = handlebars.compile(str);
    var htmlContent = template({
      page: doc,
      pageContent: pageContent
    });
    cb(err, htmlContent);
  });
};


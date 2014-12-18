var compilePage = require('./lib/compilePage');
var writeHtmlPage = require('./lib/writeHtmlPage');
var opts = {
  docs: {
    'page': './src/content/case-studies/code-beauty-art.md',
    'sidebar': './src/content/case-studies/article-tags-filter.md'
  },
  data: {
    clientList: './src/content/data/client-list.json',
    common: './src/content/data/global-content.json'
  },
  elements: {
    clientList: {
      template: './src/templates/elements/client_list.handlebars',
      data: './src/content/data/client-list.json'
    }
  },
  templates: {
    page: './src/templates/page_home.handlebars',
    html: './src/templates/html.handlebars'
  }
};
compilePage(opts, function(err, result) {
  writeHtmlPage('./build', result, function(err, result) {
    console.log(result);
  });
});
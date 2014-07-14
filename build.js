var hb = require('handlebars');
var marked = require('marked');
var ls = require('ls-stream');
var fs = require('fs');
var path = require('path');

marked.setOptions({
  gfm: true,
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

var layout = fs.readFileSync('./templates/layout.hb', 'utf8');
layout = hb.compile(layout)
var indexFile = fs.readFileSync('./templates/index.hb', 'utf8');
indexFile = hb.compile(indexFile)

var posts = [];

function getPostData(filepath) {
  var date, title;
  var basename = path.basename(filepath);
  basename = basename.substr(0, basename.length - 3);
  var link = 'posts/' + basename + '.html';
  var idx = basename.indexOf('--');
  if (idx > -1) {
    date = basename.substr(0, idx);
    title = basename.substr(idx + 2);
  }

  return {
    link: link,
    title: title.replace(/-/, ' '),
    date: new Date(date).toDateString("MM/DD/YYYY"),
    filepath: filepath
  }
}

ls('./posts')
.on('data', function(data) {
  posts.push(getPostData(data.path))
})
.on('end', function() {
  posts.forEach(function(post) {
    fs.readFile(post.filepath, function(err, body) {

      fs.writeFile('build/' + post.link, layout({content: htmlIt(body)}), function(err) {
        if (err) console.error('OH NOOO', post.link, 'has failed');
        console.log('Wrote ', post.link);
      });
    })
  })

  indexFile = indexFile({posts: posts.reverse()});
  fs.writeFile('build/index.html', layout({content: indexFile}), function(err) {
    if (err) console.error('error writing index.html')
    console.log('wrote index.html')
  })
})

function htmlIt(buf) {
  return marked(buf.toString())
}
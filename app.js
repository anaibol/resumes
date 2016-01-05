var express = require('express');
var app = express();

var jsonfile = require('jsonfile');

var resumeToPDF = require('resume-to-pdf');
var resumeToHTML = require('resume-to-html');


// app.use(express.static('public'));

app.use('/:name/resume.json', express.static(__dirname + '/resumes'));
app.use('/:name/edit', express.static(__dirname + '/editor'));

app.get('/:name', function (req, res) {
  // jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
  //   resumeToHTML(resume, {
  //     theme: 'abbeal'
  //   }, function(data) {
  //     res.send(data)
  //   })
  // })
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

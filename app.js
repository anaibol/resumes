var express = require('express');
var app = express();

var jsonfile = require('jsonfile');

var resumeToPDF = require('resume-to-pdf');
var resumeToHTML = require('./resume2html');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(express.static('public'));

app.get('/', function (req, res) {
  jsonfile.readFile('./resumes/' + 'juan-anibal-micheli' + '.json', function(err, resume) {
      res.json([resume])
  })
});

app.get('/:name/resume.json', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    res.json(resume)
  })
});

app.post('/:name/resume.json', function (req, res) {
  jsonfile.writeFile('./resumes/' + req.params.name + '.json', req.params.json, function(err, resume) {
    res.json(resume)
  })
});

app.get('/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    resumeToHTML(resume, {
      themeName: 'abbeal-green',
    }, function(data) {
      res.send(data)
    });
  });
});

app.get('/:name/edit', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    resumeToHTML(resume, {
      themeName: 'abbeal-green',
      editMode: true
    }, function(data) {
      res.send(data)
    });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

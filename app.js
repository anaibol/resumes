var express = require('express');
var app = express();

var proxy = require('proxy-middleware');
var url = require('url');

var jsonfile = require('jsonfile');

var jsonResume = require('./jsonResume');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/editor/assets', proxy(url.parse('http://localhost:8080/assets')));

// app.use(express.static('public'));

app.get('/api/resumes', function (req, res) {
  jsonfile.readFile('./resumes/' + 'juan-anibal-micheli' + '.json', function(err, resume) {
      res.json([resume])
  })
});

app.get('/api/resumes/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    res.json(resume)
  })
});

app.post('/api/resumes/:name', function (req, res) {
  jsonfile.writeFile('./resumes/' + req.params.name + '.json', req.params.json, function(err, resume) {
    res.json(resume)
  })
});

app.get('/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    jsonResume.resumeToHtml(resume, {
      theme: 'abbeal-green',
    }, function(data) {
      res.send(data)
    });
  });
});

app.get('/:name/download', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    jsonResume.resumeToPdf(resume, {
      theme: 'abbeal-green',
    }, function(err, buffer) {

      res.sendFile(buffer.filename)
    });
  });
});

app.get('/editor/:id*?', function (req, res) {
  res.sendFile(__dirname + '/editor/index.html');
});

var webpackDevServer = new WebpackDevServer(webpack(config), {
    contentBase: __dirname,
    hot: true,
    quiet: false,
    noInfo: false,
    publicPath: "/assets/",
    stats: { colors: true }
});

webpackDevServer.listen(8080, "localhost", function() {});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

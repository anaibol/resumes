var express = require('express');
var expressHandlebars  = require('express-handlebars');

var app = express();

var request = require('request');

var proxy = require('proxy-middleware');
var url = require('url');

var jsonfile = require('jsonfile');

var jsonResume = require('./jsonResume');

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

var md5 = require('md5');

var pdf = require('html-pdf');

var moment = require('moment')

var hbs = expressHandlebars({
  defaultLayout: 'layout',
  extname: '.handlebars',
  helpers: {
    formatDate: function(startDate, endDate) {
      startDate = moment('01-' + startDate, "DD-MM-YYYY");
      endDate = moment('01-' + endDate, "DD-MM-YYYY");

      var years = endDate.diff(startDate, 'year');
      startDate.add(years, 'years');

      var months = endDate.diff(startDate, 'months');

      var duration = years + ' years ' + months + ' months ';

      return duration
    }
  }
})

app.engine('.handlebars', hbs);
app.set('view engine', '.handlebars');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/admin/assets', proxy(url.parse('http://localhost:8080/assets')));
app.use('/css', express.static(__dirname + '/theme/'));

app.get('/api/resumes', function (req, res) {
  jsonfile.readFile('./resumes/' + 'juan-anibal-micheli' + '.json', function(err, resume) {
      res.json([resume])
  });
});

app.get('/api/resumes/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    res.json(resume)
  });
});

app.post('/api/resumes/:name', function (req, res) {
  jsonfile.writeFile('./resumes/' + req.params.name + '.json', req.params.json, function(err, resume) {
    res.json(resume)
  });
});

app.get('/resume/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    if (err) return;
    res.render('abbeal-green' + '/resume', Object.assign(resume, {
      theme: 'abbeal-green',
      baseUrl: req.protocol + '://' + req.get('host'),
      md5email: md5(resume.basics.email)
    }));
  });
});

app.get('/resume/:name/download', function (req, res) {
  request(req.protocol + '://' + req.get('host') + '/resume/' + req.params.name, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      pdf.create(body, {
        // A4 size? what is that?
        width: '297mm',
        height: '400mm'
      }, function(err, buffer) {
        res.sendFile(buffer.filename);
      });
    }
  })
});

app.get('/admin/:id*?', function (req, res) {
  res.sendFile(__dirname + '/admin/index.html');
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

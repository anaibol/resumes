var express = require('express');
var bodyParser = require('body-parser');

var expressHandlebars = require('express-handlebars');

var app = express();

app.use(bodyParser.json());

var auth = require('basic-auth')

var proxy = require('proxy-middleware');
var url = require('url');

var jsonfile = require('jsonfile');

var md5 = require('md5');

var pdf = require('html-pdf');

var moment = require('moment');

var _ = require('lodash');

var hbs = expressHandlebars({
  defaultLayout: 'layout',
  extname: '.handlebars',
  helpers: {
    formatDate: function(startDate, endDate) {
      startDate = moment(startDate, 'YYYY-MM-DD');
      endDate = moment(endDate, 'YYYY-MM-DD');

      var years = endDate.diff(startDate, 'year');
      startDate.add(years, 'years');

      var months = endDate.diff(startDate, 'months');

      var yr;

      if (years > 1) {
        yr = years + ' years';
      } else if (years > 0) {
        yr = '1 year';
      } else {
        yr = ''
      }

      var mn;

      if (months > 1) {
        mn = months + ' months';
      } else if (months > 0) {
        mn = '1 month';
      } else {
        mn = '';
      }

      var duration = yr + ' ' + mn;
      return duration
    }
  }
})

app.engine('.handlebars', hbs);
app.set('view engine', '.handlebars');

app.use(function(req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  var credentials = auth(req);

  if (!credentials || credentials.name !== 'john' || credentials.pass !== 'secret') {
    res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="example"')
    res.end('Access denied')
  } else {
    next();
  }
});

app.use('/admin/assets', express.static(__dirname + '/dist/'));
app.use('/css', express.static(__dirname + '/theme/'));
app.use('/css', express.static(__dirname + '/theme/'));


app.get('/api/schema', function (req, res) {
  res.sendFile(__dirname + '/schema.json');
});

app.get('/api/resume/:name', function (req, res) {
  res.sendFile(__dirname + '/resumes/' + req.params.name + '.json');
});

app.post('/api/resume/:name', function (req, res) {
  jsonfile.writeFile(__dirname + '/resumes/' + req.params.name + '.json', req.body.resume, {spaces: 2}, function (err) {
    if (err) {
      console.log(err);
      res.sendStatus(500)
    } else {
      res.send(true)
    }
  })
});

app.get('/resume/:name', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    if (err) return;

    if (resume.works) {
      var skills = {
        'Languages': [],
        'Tests': [],
        'Frameworks, CMS-API': [],
        'Servers': [],
        'Continuous Integration': [],
        'IDE': []
      }

      resume.works.forEach(function(work) {
        if (work.skills) {
          for (var skill in work.skills) {
            work.skills[skill].forEach(function(sk) {
              skills[skill].push(sk);
            })
          }
        }
      });

      for (var skill in skills) {
        skills[skill] = _.uniq(skills[skill]);
      }

      resume.skills = skills;
    }

    res.render('abbeal-green' + '/resume', Object.assign(resume, {
      theme: 'abbeal-green',
      baseUrl: req.protocol + '://' + req.get('host'),
      slugName: req.params.name,
      md5email: md5(resume.basics.email)
    }));
  });
});

app.get('/resume/:name/download', function (req, res) {
  jsonfile.readFile('./resumes/' + req.params.name + '.json', function(err, resume) {
    if (err) return;

    if (resume.works) {
      var skills = {
        'Languages': [],
        'Tests': [],
        'Frameworks, CMS-API': [],
        'Servers': [],
        'Continuous Integration': [],
        'IDE': []
      }

      resume.works.forEach(function(work) {
        if (work.skills) {
          for (var skill in work.skills) {
            work.skills[skill].forEach(function(sk) {
              skills[skill].push(sk);
            })
          }
        }
      });

      for (var skill in skills) {
        skills[skill] = _.uniq(skills[skill]);
      }

      resume.skills = skills;
    }

    app.render('abbeal-green' + '/resume', Object.assign(resume, {
      theme: 'abbeal-green',
      pdf: 'true',
      slugName: req.params.name,
      baseUrl: req.protocol + '://' + req.get('host'),
      md5email: md5(resume.basics.email)
    }), function(err, html) {
      pdf.create(html, {
        format: 'A4'
      }, function(err, buffer) {
        res.setHeader('Content-disposition', 'attachment; filename=' + req.params.name + '.pdf');
        res.sendFile(buffer.filename);
      });
    });
  });
});

app.get(['/resume/:name/edit', '/resume/:name/create'], function (req, res) {
  res.sendFile(__dirname + '/editor/index.html');
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

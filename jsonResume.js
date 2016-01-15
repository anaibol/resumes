var fs = require('fs');
var path = require('path');
var resumeSchema = require('resume-schema');
var resumeToMarkdown = require('resume-to-markdown');
var marked = require('marked');
var _ = require('lodash');
var gravatar = require('gravatar');
var pdf = require('html-pdf');

function resumeToHtml(resumeObject, options, callback) {
	var containerHtml = fs.readFileSync(__dirname + '/theme/container.html', 'utf8');
	var resumeHtml = fs.readFileSync(__dirname + '/theme/'+ options.theme +'/resume.html', 'utf8');

	if (!resumeObject) return

	_.each(resumeObject.work, function(w){

		w.startDateYear = w.startDate.substr(0,4);

		if(w.endDate) {
			w.endDateYear = w.endDate.substr(0,4);
		} else {
			w.endDateYear = 'Present'
		}
	});

	_.each(resumeObject.education, function(e){
		e.startDateYear = e.startDate.substr(0,4);
		if(e.endDate) {
			e.endDateYear = e.endDate.substr(0,4);
		}  else {
			e.endDateYear = 'Present'
		}
	});

	if(resumeObject.bio && resumeObject.bio.email && resumeObject.bio.email.personal) {
		resumeObject.bio.gravatar = gravatar.url(resumeObject.bio.email.personal, {
      s: '100',
      r: 'pg',
      d: 'mm'
    });
	}
	var containerTemplate = handlebars.compile(containerHtml);
	var resumeTemplate = handlebars.compile(resumeHtml);

	var html = resumeTemplate(resumeObject)

	// var html = handlebars.compile(container, {resumeHTML: resumeHTML, resume: resumeObject, theme: options.theme, baseUrl: options.baseUrl});
	// var resumeHTML = handlebars.compile(html);

console.log(html);
  callback(html, null);
};

function resumeToPdf(resumeJson, options, callback) {
    // add css into html as:
    // https://github.com/marcbachmann/node-html-pdf/blob/master/test/businesscard.html
    resumeToHtml(resumeJson, options, function(html) {
        pdf.create(html, {
            // A4 size? what is that?
            width: '297mm',
            height: '400mm'
        }, function(err, buffer) {
            callback(err, buffer);
        });

    });
};

module.exports = {
	resumeToHtml: resumeToHtml,
	resumeToPdf: resumeToPdf
}

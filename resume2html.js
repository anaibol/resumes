var fs = require('fs');
var Mustache = require('mustache');
var path = require('path');
var resumeSchema = require('resume-schema');
var resumeToMarkdown = require('resume-to-markdown');
var marked = require('marked');
var _ = require('lodash');
var gravatar = require('gravatar');

function resumeToHTML(resumeObject, options, callback) {
	theme = getTheme(options.themeName);

	if (options.editMode) {
		container = fs.readFileSync(__dirname + '/theme/edit-container.html', 'utf8');
	} else {
		container = fs.readFileSync(__dirname + '/theme/container.html', 'utf8');
	}

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
	var resumeHTML = Mustache.render(theme.html, resumeObject);

	var html = Mustache.render(container, {resumeHTML: resumeHTML, resume: resumeObject, theme: theme.css});

  callback(html, null);
};
function getTheme(themeName, themePath) {
	var theme;

	if (themePath) {
		theme = {
			html: fs.readFileSync(themePath + '/resume.html', 'utf8'),
			css: fs.readFileSync(themePath + '/resume.css', 'utf8'),
		}
	} else {
		theme = {
			html: fs.readFileSync(__dirname + '/theme/'+ themeName +'/resume.html', 'utf8'),
			css: fs.readFileSync(__dirname + '/theme/'+ themeName +'/resume.css', 'utf8'),
		}
	}

	return theme
}

module.exports = resumeToHTML;

import React, {Component} from 'react'
import ResumeItem from './ResumeItem'

export default ({resumes}) => (
	<ul>
		{resumes.map((resume, i) => <ResumeItem key={i} resume={resume} />) }
	</ul>
)

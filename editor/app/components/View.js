import React, {Component} from 'react'
import { Link } from 'react-router'
import slugify from 'slugify'

export default ({resume}) => {
	const editUrl = './' + slugify(resume.basics.name).toLowerCase() + '/edit'
	return (
		<div>
			<h1>{resume.basics.name}</h1>
			<Link to={editUrl}>edit</Link>
		</div>
	)
}

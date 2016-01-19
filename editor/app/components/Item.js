import React, { Component } from 'react'
import { Link } from 'react-router'
import slugify from 'slugify'

export default ({ resume }) => {
  const resumeUrl = '/' + slugify(resume.basics.name).toLowerCase()
  return <li><Link to={resumeUrl}>{resume.basics.name}</Link></li>
}

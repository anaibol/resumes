import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import { createHistory, useBasename } from 'history'
import Edit from './containers/Edit'

const history = useBasename(createHistory)({
  basename: '/resume',
})

ReactDOM.render(
	<Router history={history}>
		<Route path="/:name/edit" component={Edit}/>
		<Route path="/:name/create" component={Edit}/>
	</Router>,
 document.getElementById('app'))

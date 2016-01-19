import React from 'react'
import ReactDOM from 'react-dom'
// import { createStore,combineReducers } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { createHistory, useBasename } from 'history';

import { syncReduxAndRouter, routeReducer } from 'redux-simple-router'
import reducers from './reducers'

// import List from './containers/List'
import Edit from './containers/Edit'
// import View from './containers/View'

// const reducer = combineReducers(Object.assign({}, reducers, {
//   routing: routeReducer
// }))

// const store = createStore(reducer)

const history = useBasename(createHistory)({
  basename: '/resume',
})

// syncReduxAndRouter(history, store)

// <Route path="/" component={List}/>
// <Route path="/:name" component={View}/>
// <Route path="/create" component={Edit}/>
// <Provider store={store}>
// </Provider>,

ReactDOM.render(
	<Router history={history}>
		<Route path="/:name/edit" component={Edit}/>
	</Router>,
 document.getElementById('app'));

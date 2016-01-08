import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect, PromiseState } from 'react-refetch'
import ResumeView from '../components/ResumeView'
import DumpInput from '../components/DumpInput'
import * as ResumeActions from '../actions/resume'

export default class View extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.actions.deleteResume(name);

  render() {
    const { getResume } = this.props
		if (getResume.pending) {
	    return <span>loading</span>
	  } else if (getResume.rejected) {
	    return <span>{getResume.reason}</span>
	  } else if (getResume.fulfilled) {
	    return <ResumeView resume={getResume.value}/>
		}
	}
}

export default connect(props => {
	console.log(props)
	return ({
	  getResume: `/api/resumes/${props.routeParams.name}`
	})

})(View)

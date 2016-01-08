import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect, PromiseState } from 'react-refetch'
import ResumeView from '../components/ResumeView'
import DumpInput from '../components/DumpInput'
import * as ResumeActions from '../actions/resume'
import ResumeForm from '../components/ResumeForm'

export default class Edit extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.deleteResume(name);

  render() {
    const { getResume, postResume, deleteResume } = this.props

		if (getResume.pending) {
	    return <span>loading</span>
	  } else if (getResume.rejected) {
	    return <span></span>
	    return <span>{getResume.reason}</span>
	  } else if (getResume.fulfilled) {
	    return <ResumeForm resume={getResume.value} onPost={postResume} onDelete={deleteResume} />
		}
	}
}

export default connect(props => ({
  getResume: `/api/resumes/${props.routeParams.name}`,
  postResume: resume => ({
    postResumeResponse: {
      url: `/api/resumes/${props.routeParams.name}`,
      method: 'POST',
      body: JSON.stringify({ resume })
    }
  }),
  deleteResume: name => ({
    deleteResumeResponse: {
      url: `/api/resumes/${props.routeParams.name}/delete`,
      method: 'POST',
      body: JSON.stringify({ resume })
    }
  }),
}))(Edit)

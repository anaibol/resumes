import React, { Component } from 'react'
import { connect, PromiseState } from 'react-refetch'
import ResumeView from '../components/View'
import DumpInput from '../components/DumpInput'
import Form from '../components/Form'

export default class Edit extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.deleteResume(name);

  render() {
    const { getSchema, getResume, postResume, deleteResume } = this.props

    const allFetches = PromiseState.all([getSchema, getResume])

    if (allFetches.pending) {
	    return <span>loading</span>
	  } else if (allFetches.rejected) {
	    return <span></span>
	    return <span>{allFetches.reason}</span>
	  } else if (allFetches.fulfilled) {
      const [schema, resume] = allFetches.value
	    return <Form schema={schema} resume={resume} onPost={postResume} onDelete={deleteResume} />
		}
	}
}

export default connect(props => ({
  getSchema: '/api/schema',
  getResume: `/api/resume/${props.routeParams.name}`,
  postResume: resume => ({
    postResumeResponse: {
      url: `/api/resume/${props.routeParams.name}`,
      method: 'POST',
      body: JSON.stringify({ resume })
    }
  }),
  deleteResume: name => ({
    deleteResumeResponse: {
      url: `/api/resume/${props.routeParams.name}/delete`,
      method: 'POST',
      body: JSON.stringify({ resume })
    }
  }),
}))(Edit)

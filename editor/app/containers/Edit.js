import React, { Component } from 'react'
import { connect, PromiseState } from 'react-refetch'
import View from '../components/View'
import Form from "react-jsonschema-form"

export default class Edit extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.deleteResume(name);

  render() {
    const { getSchema, getResume, postResume, deleteResume } = this.props

    const log = (type) => console.log.bind(console, type);

    const allFetches = PromiseState.all([getSchema, getResume])

    if (allFetches.pending) {
	    return <span>loading</span>
	  } else if (allFetches.rejected) {
	    return <span></span>
	  } else if (allFetches.fulfilled) {
      const [schema, resume] = allFetches.value
      return <Form schema={schema}
            formData={resume}
            onChange={log("changed")}
            onSubmit={postResume}
            onError={log("errors")} />
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
      body: JSON.stringify({ resume: resume.formData })
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

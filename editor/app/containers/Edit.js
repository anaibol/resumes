import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexgrid'
import { connect, PromiseState } from 'react-refetch'
import View from '../components/View'
import Form from "react-jsonschema-form"

// import handlebars from 'handlebars'
var template = require("./../../../views/abbeal-green/resume.handlebars");

import 'react-flexgrid/lib/flexgrid.css'
import 'react-jsonschema-form/dist/react-jsonschema-form.css'
import '../../styles/edit.css'

export default class Edit extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.deleteResume(name);

  constructor(props) {
    super(props)
    this.state = {resume: {}}
  }

  updateView = ({formData}) => {
    console.log(this.state.resume);
    console.log(formData)
    this.setState({resume: formData})
    return true;
  };

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
      return (
        <Grid>
          <Row>
            <Col xs={6} md={6}>
              <Form schema={schema}
                formData={resume}
                onChange={this.updateView}
                onSubmit={postResume}
                onError={log("errors")} />
            </Col>
            <Col xs={6} md={6}>
              {JSON.stringify(this.state.resume) !== '{}' ? (
                <View resume={this.state.resume} />
              ) :
              null}
            </Col>
          </Row>
        </Grid>
      )
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

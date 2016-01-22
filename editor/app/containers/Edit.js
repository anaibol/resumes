import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-flexgrid'
import { connect, PromiseState } from 'react-refetch'
import View from '../components/View'
import Form from 'react-jsonschema-form'

import { ToastContainer, ToastMessage } from 'react-toastr'

const ToastMessageFactory = React.createFactory(ToastMessage.animation)


// import handlebars from 'handlebars'
// var template = require("./../../../views/abbeal-green/resume.handlebars");

import 'react-flexgrid/lib/flexgrid.css'
import 'react-jsonschema-form/dist/react-jsonschema-form.css'
import '../../styles/edit.css'
import 'animate.css/animate.css'
import '../../styles/react-toaster.css'

const uiSchema = {
  basics: {
    classNames: 'basics',
    email: {
      'ui:widget': ({ placeholder }) => {
        return <input type="email" placeholder={ placeholder } />
      }
    },
    summary: {
      'ui:widget': ({ placeholder }) => {
        return <textarea placeholder={ placeholder } />
      }
    }
  },
  works: {
    classNames: 'works'
  },
  volunteer: {
    classNames: 'volunteer'
  },
  education: {
    classNames: 'education'
  },
  awards: {
    classNames: 'awards'
  },
  publications: {
    classNames: 'publications'
  }
}

export default class Edit extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.deleteResume(name);
  // state = {tmpResume: {}};

  // constructor(props) {
  //   super(props)
  //
  //
  //
  //   // this.getSchema = this.props.getSchema
  //   // this.getResume = this.props.getResume
  //
  // }

  log = (type) => {
    console.log.bind(console, type)
    window.scrollTo(0, 0)
  };

  // addAlert () {
  //   this.refs.container.success(
  //     "Welcome welcome welcome!!",
  //     "You are now home my friend. Welcome home my friend.", {
  //     timeOut: 30000,
  //     extendedTimeOut: 10000
  //   });
  // };

  updateView = (e) => {
    const formData = e.formData
    console.log(e)
    //
    // if (this.state.tmpResume.basics) {
    //   console.log(this.state.tmpResume.basics.name);
    // } else {
    //   console.log(this.state.tmpResume);
    // }
    // console.log(formData)
    // // console.log(formData)
    // // this.setState({resume: formData})
    // console.log(this.state.resume);
    // // return true;
  };

  postResume = (resume) => {
    console.log(resume);
    this.props.postResume(resume)
  };

  render() {
    const { getSchema, getResume, postResume } = this.props
    const allFetches = PromiseState.all([getSchema, getResume])

    if (allFetches.pending) {
      return <span>loading</span>
    } else if (allFetches.rejected) {
      const [schema] = allFetches.value
      return (
        <Grid>
          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
          <Row>
            <Col xs={6} md={6}>
              <Form schema={schema}
                uiSchema={uiSchema}
                onChange={this.updateView}
                onSubmit={postResume}
                onError={this.log("errors")} />
            </Col>
            <Col xs={6} md={6}>
            </Col>
          </Row>
        </Grid>
      )
      {JSON.stringify(this.state.tmpResume) !== '{}' ? (
        <View resume={this.state.tmpResume} />
      ) :
      null}
    } else if (allFetches.fulfilled) {
      const [schema, resume] = allFetches.value
      console.log(resume);
      return (
        <Grid>
          <ToastContainer ref="container"
            toastMessageFactory={ToastMessageFactory}
            className="toast-top-right" />
          <Row>
            <Col xs={6} md={6}>
              <Form schema={schema}
                formData={resume}
                onChange={this.updateView}
                onSubmit={this.postResume}
                onError={this.log("errors")} />
            </Col>
          </Row>
        </Grid>
      )
    }
	}
}
// <Col xs={6} md={6}>
//   {JSON.stringify(this.state.tmpResume) !== '{}' ? (
//     <View resume={this.state.tmpResume} />
//   ) :
//   null}
// </Col>

export default connect(props => ({
  getSchema: '/api/schema',
  getResume: `/api/resume/${props.routeParams.name}`,
  postResume: resume => ({
    getResume: {
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

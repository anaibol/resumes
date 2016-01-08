import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect, PromiseState } from 'react-refetch'
import ResumeList from '../components/ResumeList'
import DumpInput from '../components/DumpInput'
import * as ResumeActions from '../actions/resume'

export default class List extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.actions.deleteResume(name);

  render() {
		console.log(this.props.listResumeFetch);
		const { listResumeFetch } = this.props

		if (listResumeFetch.pending) {
	    return <span>loading</span>
	  } else if (listResumeFetch.rejected) {
	    return <span>{listResumeFetch.reason}</span>
	  } else if (listResumeFetch.fulfilled) {
	    return <ResumeList resumes={listResumeFetch.value}/>
		}
	}
}

export default connect(props => ({
  listResumeFetch: `/api/resumes`
}))(List)

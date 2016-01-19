import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect, PromiseState } from 'react-refetch'
import List from '../components/List'
import DumpInput from '../components/DumpInput'
import * as ResumeActions from '../actions/resume'

export default class List extends Component {
	// createResume = (name, obj) => this.props.actions.createResume(name, obj);
	//
	// deleteResume = name => this.props.actions.deleteResume(name);

  render() {
		console.log(this.props.listResume);
		const { listResume } = this.props

		if (listResume.pending) {
	    return <span>loading</span>
	  } else if (listResume.rejected) {
	    return <span>{listResume.reason}</span>
	  } else if (listResume.fulfilled) {
	    return <List resumes={listResume.value}/>
		}
	}
}

export default connect(props => ({
  listResume: `/api/resumes`
}))(List)

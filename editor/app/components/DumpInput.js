import React, {Component} from 'react'

class DumpInput extends Component {

	onAddTodo(e) {
		console.log(text);
		const text = e.target.value.trim()
		if (!text || e.keyCode !== 13) return
		this.props.onAddTodo(text)
		e.target.value = ''
	}

	render() {
		return (<input onKeyDown={::this.onAddTodo} placeholder="Input text" />)
	}
}

export default DumpInput
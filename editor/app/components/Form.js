import React, { Component } from 'react'
import Form from "react-jsonschema-form"
// import { reduxForm } from 'redux-form'
// import { Link } from 'react-router'
// import slugify from 'slugify'

const schema = {
  title: "Todo Tasks",
  type: "object",
  required: ["title"],
  properties: {
    title: {type: "string", title: "Title", default: "A new task"},
    done: {type: "boolean", title: "Done?", default: false}
  }
};

const formData = {
  title: "First task",
  done: true
};


// import Divider from 'material-ui/lib/divider'
// import Paper from 'material-ui/lib/paper'
// import TextField from 'material-ui/lib/text-field'
// import FlatButton from 'material-ui/lib/flat-button'
// import IconButton from 'material-ui/lib/icon-button'
// import SelectField from 'material-ui/lib/select-field'
// import FontIcon from 'material-ui/lib/font-icon'
// import DropDownMenu from 'material-ui/lib/drop-down-menu'
// import DatePicker from 'material-ui/lib/date-picker/date-picker'

class form extends Component {
	// constructor() {
	// 	super()
	// }

	// postResume = ({formData}) => {
	// 	console.log(123);
	// 	console.log(this.props.postResume);
	// 	console.log(formData);
	// 	this.props.postResume.bind(this, formData)
	// };

	log = (type) => console.log.bind(console, type);

	render() {
			console.log(this.props);
		const { resume, schema, postResume } = this.props


		const log = (type) => console.log.bind(console, type);

		//
		// const formData = {
		//   name: "First task",
		//   done: true
		// };

		return (
			<Form schema={schema}
	        formData={resume}
	        onChange={log("changed")}
	        onSubmit={postResume}
	        onError={log("errors")} />
		)
	}
}

export default form

// export default ({resume}) => {
// 	// const editUrl = './' + slugify(resume.basics.name).toLowerCase() + '/edit'
// 	return (
		// <div>
		// 	<h1>Editing resume</h1>
		//
		// 	<div>
		// 		<h2>Basic information</h2>
		// 		<TextField defaultValue={resume.basics.name} hintText="Name" /><br/>
		// 		<TextField defaultValue={resume.basics.label} hintText="Label" /><br/>
		// 		<TextField defaultValue={resume.basics.phone} hintText="Phone" /><br/>
		// 		<TextField defaultValue={resume.basics.website} hintText="Website" /><br/>
		// 		<textarea defaultValue={resume.basics.summary} hintText="Summary" /><br/>
		// 		<Link to={editUrl}>edit</Link>
		// 		<FlatButton label="Default" />
		// 	</div>
		//
		// 	<div>
		// 		<h2>Qualifications</h2>
		// 		<TextField defaultValue={resume.basics.name} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.label} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.phone} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.website} hintText="Styled Hint Text" /><br/>
		// 		<textarea defaultValue={resume.basics.summary} hintText="Styled Hint Text" /><br/>
		// 		<Link to={editUrl}>edit</Link>
		// 		<FlatButton label="Default" />
		// 	</div>
		//
		// 	<div>
		// 		<h2>Education - Languages</h2>
		// 		<TextField defaultValue={resume.basics.name} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.label} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.phone} hintText="Styled Hint Text" /><br/>
		// 		<TextField defaultValue={resume.basics.website} hintText="Styled Hint Text" /><br/>
		// 		<textarea defaultValue={resume.basics.summary} hintText="Styled Hint Text" /><br/>
		// 		<Link to={editUrl}>edit</Link>
		// 		<FlatButton label="Default" />
		// 	</div>
		// </div>
	// )
	// <Paper zDepth={2}>
	// <TextField hintText="First name" underlineStyle={underlineStyle} style={style} />
	// <Divider />
	// <TextField hintText="Middle name" underlineStyle={underlineStyle} style={style} />
	// <Divider />
	// <TextField hintText="Last name" underlineStyle={underlineStyle} style={style} />
	// <Divider />
	// <TextField hintText="Email address" underlineStyle={underlineStyle} style={style} />
	// <Divider />
	// </Paper>
	// <Button>Save</Button>
// }

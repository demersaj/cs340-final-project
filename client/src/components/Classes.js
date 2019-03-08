import React, { Component } from 'react';
import './Table.css';

class Classes extends Component {
	state = {
		classes: []
	};

	componentDidMount() {
		this.getClasses();
	}

	getClasses = _ => {
		fetch('http://localhost:60001/classes')
			.then(response => response.json())
			.then(response => this.setState({ classes: response.data }))
			.catch(err => console.error(err));
	};

	renderClass = ( { class_id, class_name, instructor } ) =>
		<div className='two-wrapper'>
			<div className='column' key={class_id}>{class_name}</div>
			<div className='column'>{instructor}</div>
		</div>;

	render() {
		const {classes} = this.state;
		return (
			<div className='App'>
				<h2>Classes</h2>
				<div className='two-wrapper'>
					<div className='column'><strong>Class</strong></div>
					<div className='column'><strong>Instructor</strong></div>
				</div>
				{classes.map(this.renderClass)}
			</div>
		);
	};
}

export default Classes;

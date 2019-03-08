import React, { Component } from 'react';
import './Table.css';

class Instructors extends Component {
	state = {
		instructors: [],
		instructor: {
			//instructor_id: null,
			fName: '',
			lName: '',
			office_loc: ''
		}
	};

	componentDidMount() {
		this.getInstructors();
	}

	getInstructors = _ => {
		fetch('http://localhost:60001/instructors')
			.then(response => response.json())
			.then(response => this.setState({ instructors: response.data }))
			.catch(err => console.error(err));
	};

	addInstructor = _ => {
		const { instructor } = this.state;
		fetch(`http://localhost:60001/instructors/add?instructor_id=${instructor.instructor_id}&fName=${instructor.fName}&lName=${instructor.lName}&office_loc=${instructor.office_loc}`)
			.then(this.getInstructors)
			.catch(err => console.error(err));
	};

	renderInstructor = ( { instructor_id, fName, lName, office_loc } ) =>
		<div class="four-wrapper">
			<div class='column' key={instructor_id}>{instructor_id}</div>
			<div class='column'>{fName}</div>
			<div class='column'>{lName}</div>
			<div class='column'>{office_loc}</div>
		</div>;

	deleteInstructor = _ => {
		const { instructor } = this.state;
		fetch(`http://localhost:60001/instructors/delete?instructor_id=${instructor.instructor_id}`)
			.then(this.getInstructors)
			.catch(err => console.error(err));
	};

	render() {
		const { instructors, instructor } = this.state;

		return (
			<div className='App'>
				<h2>Instructors</h2>
				<div class="four-wrapper">
					<div class='column'>
						<strong>Instructor ID</strong>
					</div>
					<div className='column'>
						<strong>First Name</strong>
					</div>
					<div className='column'>
						<strong>Last Name</strong>
					</div>
					<div className='column'>
						<strong>Office Location</strong>
					</div>
				</div>

				{instructors.map(this.renderInstructor)}

				<div>
					<h2>Add Instructor</h2>
					<input
						value={instructor.instructor_id}
						placeholder={'Instructor ID'}
						onChange={e => this.setState({ instructor: { ...instructor, instructor_id: e.target.value } })}
					/>
					<input
						value={instructor.fName}
						placeholder={'First Name'}
						onChange={e => this.setState({ instructor: { ...instructor, fName: e.target.value } })}
					/>
					<input
						value={instructor.lName}
						placeholder={'Last Name'}
						onChange={e => this.setState({ instructor: { ...instructor, lName: e.target.value } })}
					/>
					<input
						value={instructor.office_loc}
						placeholder={'Office Location'}
						onChange={e => this.setState({ instructor: { ...instructor, office_loc: e.target.value } })}
					/>
					<button onClick={this.addInstructor}>Add Instructor</button>
				</div>

				<div>
					<h2>Delete Instructor</h2>
					<input
						value={instructor.instructor_id}
						placeholder={'ID to be deleted'}
						onChange={e => this.setState({ instructor: { ...instructor, instructor_id: e.target.value } })}
					>
					</input>
					<button onClick={this.deleteInstructor}>Delete Instructor</button>
				</div>
			</div>
	);
	}
	}

	export default Instructors;
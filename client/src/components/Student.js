import React, { Component } from 'react';

class Student extends Component {
	state = {
		students: [],
		student: {
			student_id: null,
			fName: '',
			lName: '',
			class_year: ''
		}
	};

	componentDidMount() {
		this.getStudents();
	}

	getStudents = _ => {
		fetch('http://localhost:60001/students')
			.then(response => response.json())
			.then(response => this.setState({ students: response.data }))
			.catch(err => console.error(err));
	};

	addStudent = _ => {
		const { student } = this.state;
		fetch(`http://localhost:60001/students/add?student_id=${student.student_id}&fName=${student.fName}&lName=${student.lName}
		&class_year=${student.class_year}`)
			.then(this.getStudents)
			.catch(err => console.error(err));
	};

	deleteStudent = _ => {
		const { student } = this.state;
		fetch(`http://localhost:60001/students/delete?student_id=${student.student_id}`)
			.then(this.getStudents)
			.catch(err => console.error(err));
	};

	updateStudent = _ => {
		const { student } = this.state;
		fetch(`http://localhost:60001/students/update?fName='${student.fName}'&lName='${student.lName}'
		&class_year='${student.class_year}'&student_id=${student.student_id}`)
			.then(this.getStudents)
			.catch(err => console.error(err));
	};

	renderStudent = ( { student_id, fName, lName, class_year } ) =>
		<div className='four-wrapper'>
			<div className='column' key={student_id}>{student_id}</div>
			<div className='column'>{fName}</div>
			<div className='column'>{lName}</div>
			<div className='column'>{class_year}</div>
		</div>;

	render() {
		const { students, student } = this.state;

		return (
			<div className='App'>
				<h2>Students</h2>
				<div className='four-wrapper'>
					<div className='column'><strong>Student ID</strong></div>
					<div className='column'><strong>First Name</strong></div>
					<div className='column'><strong>Last Name</strong></div>
					<div className='column'><strong>Year</strong></div>
				</div>

				{students.map(this.renderStudent)}

				<div>
					<h2>Add Student</h2>
					<input
						value={student.student_id}
						placeholder={'Student ID'}
						onChange={e => this.setState({ student: { ...student, student_id: e.target.value } })}
					/>
					<input
						value={student.fName}
						placeholder={'First Name'}
						onChange={e => this.setState({ student: { ...student, fName: e.target.value } })}
					/>
					<input
						value={student.lName}
						placeholder={'Last Name'}
						onChange={e => this.setState({ student: { ...student, lName: e.target.value } })}
					/>
					<select
						value={student.class_year}
						onChange={e => this.setState({ student: { ...student, class_year: e.target.value } })}
					>
						<option value='null'>NULL</option>
						<option value='Freshman'>Freshman</option>
						<option value='Sophomore'>Sophomore</option>
						<option value='Junior'>Junior</option>
						<option value='Senior'>Senior</option>
					</select>

					<button onClick={this.addStudent}>Add Student</button>
				</div>


				<div>
					<h2>Update Student Info</h2>
					<input
						value={student.student_id}
						placeholder={'Student ID'}
						onChange={e => this.setState({ student: { ...student, student_id: e.target.value } })}
					/>
					<input
						value={student.fName}
						placeholder={'First Name'}
						onChange={e => this.setState({ student: { ...student, fName: e.target.value } })}
					/>
					<input
						value={student.lName}
						placeholder={'Last Name'}
						onChange={e => this.setState({ student: { ...student, lName: e.target.value } })}
					/>
					<select
						value={student.class_year}
						onChange={e => this.setState({ student: { ...student, class_year: e.target.value } })}
					>
						<option value='null'>NULL</option>
						<option value='Freshman'>Freshman</option>
						<option value='Sophomore'>Sophomore</option>
						<option value='Junior'>Junior</option>
						<option value='Senior'>Senior</option>
					</select>

					<button onClick={this.updateStudent}>Update Info</button>
				</div>

				<div>
					<h2>Delete Student</h2>
					<input
						value={student.student_id}
						placeholder={'ID to be deleted'}
						onChange={e => this.setState({ student: { ...student, student_id: e.target.value } })}
					>
					</input>
					<button onClick={this.deleteStudent}>Delete Student</button>
				</div>
			</div>
		);
	}
}

export default Student;

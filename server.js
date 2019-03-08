const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = process.env.PORT || 60001;

app.use(cors());

// serve static files from React
app.use(express.static(path.join(__dirname, 'client/build')));

// create instance of mySQL database
const connection = mysql.createConnection({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu',
	user: 'cs340_demersa',
	password: '6650',
	database: 'cs340_demersa'
});

// connect to database
connection.connect(err => {
	if (err) {
		return err;
	}
});

// console.log(connection);

// home page
app.get('/', ( req, res ) => {
	res.send('Welcome to the Home Page');
});

// display all students
app.get('/students', ( req, res ) => {
	const SELECT_ALL_STUDENTS_QUERY = 'SELECT student_id, fName, lName, class_year FROM students';
	connection.query(SELECT_ALL_STUDENTS_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results
			});
		}
	});
});

// add new student
app.get('/students/add', ( req, res ) => {
	const { student_id, fName, lName, class_year } = req.query;
	const INSERT_STUDENT_QUERY = `INSERT INTO students (student_id, fName, lName, class_year) VALUES(${student_id}, '${fName}', '${lName}', '${class_year}')`;
	connection.query(INSERT_STUDENT_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send('successfully added student');
		}
	});
});

// update student info
app.get('/students/update', ( req, res ) => {
	const { fName, lName, class_year, student_id } = req.query;
	const UPDATE_STUDENT_QUERY = `UPDATE students SET fName=${fName}, lName=${lName}, class_year=${class_year} WHERE student_id=${student_id}`;
	connection.query(UPDATE_STUDENT_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send('successfully updated student')
		}
	});
});

// delete a student
app.get('/students/delete', ( req, res ) => {
	const { student_id } = req.query;
	const DELETE_STUDENT_QUERY = `DELETE FROM students WHERE student_id=${student_id}`;
	connection.query(DELETE_STUDENT_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			res.status(202).end();
		}
	});
});
/*
// get student schedule
app.get('/schedule', (req, res) => {
	const {student_id} = req.query;
	const SELECT_STUDENT_SCHEDULE = ``
})*/

// display all instructors
app.get('/instructors', ( req, res ) => {
	const SELECT_ALL_INSTRUCTORS_QUERY = 'SELECT instructor_id, fName, lName, office_loc FROM instructors';
	connection.query(SELECT_ALL_INSTRUCTORS_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results
			});
		}
	});
});

// add new instructor
app.get('/instructors/add', ( req, res ) => {
	const { instructor_id, fName, lName, office_loc } = req.query;
	const INSERT_INSTRUCTOR_QUERY = `INSERT INTO instructors (instructor_id, fName, lName, office_loc) VALUES(${instructor_id}, '${fName}', '${lName}', '${office_loc}')`;
	connection.query(INSERT_INSTRUCTOR_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.send('successfully added instructor');
		}
	});
});

// delete an instructor
app.get('/instructors/delete', ( req, res ) => {
	const { instructor_id } = req.query;
	const DELETE_INSTRUCTOR_QUERY = `DELETE FROM instructors WHERE instructor_id = ${instructor_id}`;
	connection.query(DELETE_INSTRUCTOR_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			res.status(202).end();
		}
	});
});

// display all classes
app.get('/classes', ( req, res ) => {
	const SELECT_ALL_CLASSES_QUERY =
		'SELECT class_id, class_name, CONCAT(instructors.fName, " ", instructors.lName) AS instructor FROM classes INNER JOIN instructors ON classes.instructor = instructors.instructor_id';
	connection.query(SELECT_ALL_CLASSES_QUERY, ( err, results ) => {
		if (err) {
			return res.send(err);
		} else {
			return res.json({
				data: results
			});
		}
	});
});


app.listen(port, () => {
	console.log(`Server now listening on port ${port}`);
});
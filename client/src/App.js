import React, { Component } from 'react';
import './App.css';
import {
	Route,
	NavLink,
	BrowserRouter
} from 'react-router-dom';

import Home from './components/Home';
import Students from './components/Student';
import Classes from './components/Classes';
import Instructors from './components/Instructors';


class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<div>
					<nav className="navbar navbar-expand-lg navbar-light bg-light">
						<ul className="navbar-nav mr-auto">
							<li><NavLink to="/" className='nav-link'>Home</NavLink></li>
							<li><NavLink to="/classes" className='nav-link'>Classes</NavLink></li>
							<li><NavLink to="/instructors" className='nav-link'>Instructors</NavLink></li>
							<li><NavLink to="/students" className='nav-link'>Students</NavLink></li>
							<li><NavLink to="/schedule" className='nav-link'>Schedule</NavLink></li>
						</ul>
					</nav>
					<div className="content">
						<Route exact path='/' component={Home} />
						<Route path='/classes' component={Classes} />
						<Route path='/instructors' component={Instructors} />
						<Route path='/students' component={Students} />
						<Route path='/schedule' component={Home} />
					</div>
				</div>
			</BrowserRouter>
		);
	}
}


export default App;

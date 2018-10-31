import React from 'react';
import { NavLink } from "react-router-dom";
 
import CodecastLogo from '../images/CODECAST_LOGO.png';
import IndexHeader from './IndexViews/IndexHeader.jsx';

function Nav() {
	return (
		<header>
			<div className='nav'>
				<img className='headerLogo' src={ CodecastLogo }></img>
				<NavLink to="/login" className="headerbtn">Login</NavLink>
				<NavLink to="/register" className="headerbtn">Register</NavLink>
			</div>
			
			<div className="header-tabs">
				<IndexHeader />
			</div>
		</header>
	)
}

export default Nav;
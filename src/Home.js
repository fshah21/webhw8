import React, { Component } from "react"
import axios from "axios"
import { Navbar, NavItem, NavDropdown, MenuItem, Nav } from 'react-bootstrap';

export default class home extends Component {
	componentDidMount = () => {
		axios.get("/home").then(function(response) {
			console.log(response.data);
		});
	};

	render() { 
		return (
			
		);
	}
}
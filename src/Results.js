import React, { Component } from 'react';

class Results extends Component {
	constructor() {
		super();
		this.state = {
			cardTitles : []
		};
	}

	componentWillMount() {
		fetch('/guardianhome')
		.then( results => {
			return results.json();
		}).then( data => {
			let cardTitles = [];
			for(var i = 0; i < data.length; i++) {
				console.log(i);
				cardTitles.push(data[i].webTitle);
				console.log(data[i].webTitle);
			}
			this.setState({cardTitles: cardTitles});
			console.log("state", this.state.cardTitles);
		})
	}

	render() {
		return (
			<div className="container2">
				<div className="container1">
					{this.state.cardTitles}
				</div>
			</div>
		)
	}
}

export default Results;
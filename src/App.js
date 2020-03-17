import React, { Component } from "react";
import { Search } from "semantic-ui-react";
import _ from "lodash";
import logo from "./logo.svg";
import SelectedResult from "./SelectedResult";
import "./App.css";
import { FaAngleDown } from 'react-icons/fa';
import { Button, Navbar, Nav, NavDropdown, Form, FormControl, InputGroup } from 'react-bootstrap';
import Switch from "react-switch";
import Results from "./Results";

class App extends Component {

  /*<InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">v</InputGroup.Text>
        </InputGroup.Prepend>
        </InputGroup>*/


  handleSearchChange = async (event, { value }) => {
    try {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?mkt=fr-FR&q=${value}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "fefb7b6b79e546c485e5c72f21877698"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ title: result.displayText, url: result.url }));
      this.setState({ results });
    } catch (error) {
      console.error(`Error fetching search ${value}`);
    }
  };

  handleResultSelect = (e, { result }) =>
    this.setState({ selectedResult: result });


  constructor() {
    super()
    this.state = {
      checked: false,
      results: [], 
      selectedResult: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(checked) {
    this.setState({checked})
  }

  render() {

    return (
      <div className="App">
      <Navbar bg="light" expand="lg" id="homenavbar">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto navwidth">
        <Search
          onSearchChange={_.debounce(this.handleSearchChange, 1000, {
            leading: true
          })}
          results={this.state.results}
          onResultSelect={this.handleResultSelect}
        />
        <Nav.Link href="#home" className="navbarLinks">Home</Nav.Link>
        <Nav.Link href="#link" className="navbarLinks">World</Nav.Link>
        <Nav.Link href="#home" className="navbarLinks">Politics</Nav.Link>
        <Nav.Link href="#home" className="navbarLinks">Business</Nav.Link>
        <Nav.Link href="#home" className="navbarLinks">Technology</Nav.Link>
        <Nav.Link href="#home" className="navbarLinks">Sports</Nav.Link>
        <Navbar.Collapse className="justify-content-end">
        <Navbar.Text className="justText justify-content-end">NY Times</Navbar.Text>
        <Switch
          className="react-switch justText"
          onChange={this.handleChange}
          checked={this.state.checked}
          checkedIcon={false}
          uncheckedIcon={false}
        />
        <Navbar.Text className="justText">Guardian</Navbar.Text>
        </Navbar.Collapse>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Results />
      </div>
    );
  }
}

export default App;
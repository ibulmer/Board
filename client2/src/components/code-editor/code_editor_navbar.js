import React, { Component, PropTypes } from 'react';;
import { DropdownButton, MenuItem, Nav, Navbar, NavItem, NavDropdown } from 'react-bootstrap';
import Webcams from './../webcams/webcam-bar';

export default class CodeEditorNavbar extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Navbar inverse>
          <Navbar.Header>
            <Navbar.Brand>
              Code Editor
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavDropdown onSelect={(e, key) => this.props.changeTheme(key)} eventKey={1} title="Style" id="basic-nav-dropdown" noCaret>
                <MenuItem eventKey="monokai"> Monokai </MenuItem>
                <MenuItem eventKey="github">Github</MenuItem>
                <MenuItem eventKey="tomorrow">Tomorrow</MenuItem>
                <MenuItem eventKey="kuroir">Kuroir</MenuItem>
                <MenuItem eventKey="twilight"> Twilight </MenuItem>
                <MenuItem eventKey="xcode"> Xcode </MenuItem>
                <MenuItem eventKey="textmate"> Textmate </MenuItem>
                <MenuItem eventKey="solarized_dark"> Solarized Dark </MenuItem>
                <MenuItem eventKey="solarized_light"> Solarized Light </MenuItem>
                <MenuItem eventKey="terminal"> Terminal </MenuItem>
              </NavDropdown>
              <NavDropdown onSelect={(e, key) => this.props.changeLang(key)} eventKey={2} title="Language" id="basic-nav-dropdown" noCaret>
                <MenuItem eventKey="javascript"> JavaScript </MenuItem>
                <MenuItem eventKey="java"> Java </MenuItem>
                <MenuItem eventKey="python"> Python </MenuItem>
                <MenuItem eventKey="xml"> XML </MenuItem>
                <MenuItem eventKey="ruby"> Ruby </MenuItem>
                <MenuItem eventKey="sass"> SASS </MenuItem>
                <MenuItem eventKey="markdown"> Markdown </MenuItem>
                <MenuItem eventKey="mysql"> MySQL </MenuItem>
                <MenuItem eventKey="json"> JSON </MenuItem>
                <MenuItem eventKey="html"> HTML </MenuItem>
                <MenuItem eventKey="handlebars"> Handlebars </MenuItem>
                <MenuItem eventKey="golang"> Golang </MenuItem>
                <MenuItem eventKey="csharp"> CSharp </MenuItem>
                <MenuItem eventKey="coffee"> Coffee </MenuItem>
                <MenuItem eventKey="css"> CSS </MenuItem>
              </NavDropdown>
              <NavItem onClick={this.props.increaseSize}>Enhance</NavItem>
              <NavItem onClick={this.props.decreaseSize}>Dehance</NavItem>
              <NavItem onClick={this.props.evaluateCode}>Run Code</NavItem>
              <NavItem onClick={this.props.findToyProblem}>Generate Toy Problem</NavItem>
              <NavItem onClick={this.props.findSolution}>Find Solution</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="#/canvas">Whiteboard</NavItem>
              <NavItem href="#/video">Video</NavItem>
              <NavItem href='/logout'>Logout</NavItem>
            </Nav>
          </Navbar.Collapse>
          <Webcams />
        </Navbar>
      </div>
    )
  }
}
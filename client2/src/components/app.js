import React, { Component } from 'react';
import ColorPicker from 'react-color';
import ToggleDisplay from 'react-toggle-display';
import CanvasDraw from './canvasdraw';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { ButtonGroup } from 'react-bootstrap';
import {DropdownButton} from 'react-bootstrap';
import {MenuItem} from 'react-bootstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleBGBox: 'Choose Background',
      toggleColorBox: 'Pick Color',
      brushColor: '#000000',
      lineWidth: 4,
      displayColorPicker: false,
      displayBGColorPicker: false,
      canvasStyle: {
        backgroundColor: '#FFFFFF'
      },
      clear: false,
      restore: false
    };
    this.showColorBox = this.showColorBox.bind(this);
    this.chooseColor = this.chooseColor.bind(this);
    this.showBGColorBox = this.showBGColorBox.bind(this)
  }

  handleOnClickClear()  {
    console.log(this);
    this.setState({
      clear: true
    });
  }

  showColorBox() {
    if(!this.state.displayColorPicker){
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Close Box"
      });
    }else{
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        toggleColorBox: "Pick Color"
      });
    }
  }

  showBGColorBox() {
    if(!this.state.displayBGColorPicker) {
      this.setState({
        displayBGColorPicker: !this.state.displayBGColorPicker,
        toggleBGBox: "Close Box"
       });
    } else {
      this.setState({
        displayBGColorPicker: !this.state.displayBGColorPicker,
        toggleBGBox: "Choose Background"
      });
    }
  }

  chooseBG(color) {
    let newstate = this.state;
    console.log(newstate)
    newstate.canvasStyle.backgroundColor = '#' + color.hex;
    newstate.clear = false;
    this.setState({
      newstate
    });
  }

  chooseColor(color) {
    this.setState({brushColor: '#' + color.hex})
  }

  saveAnImage () {
    let newCanvas = document.getElementById("canvas")
    let savedImage = new Image()
    savedImage.src = newCanvas.toDataURL('image/png')
    //console.log(savedImage.src);
    axios.post('/api/boards', {
        thing: savedImage.src
      })
      .then(function (response) {
        console.log(response);
        //handleOnClickClear();

      })
      .catch(function (response) {
        console.log("ERROR saving");
        console.log(response);
      });
  }

  restoreBoard(){
    this.setState({
      clear: true,
      restore: true
    });
  }

  render() {
    let popupPosition = {
      position: 'absolute',
      top: '12%',
      left: '5%',
    };

   return (
      <div>
        <h1>Frolicking Ampersands</h1>
          <div class = "row" className='button-bar' >
          <ButtonToolbar>
            <Button bsStyle = "primary" bsSize = "large" onClick={ this.handleOnClickClear.bind(this) }>Clear</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={ this.showColorBox }>{this.state.toggleColorBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={ this.showBGColorBox }>{this.state.toggleBGBox}</Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.saveAnImage}> Heyyy </Button>
            <Button bsStyle = "primary" bsSize = "large" onClick={this.restoreBoard.bind(this)}> Restore </Button>
            <DropdownButton bsSize="sm" title="Large button" id="dropdown-size-large">
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
          </div>

          <div className='canvas-style'>
            <CanvasDraw {...this.state}/>
          </div>

          <ToggleDisplay show={this.state.displayColorPicker}>
            <ColorPicker
                type="sketch"
                positionCSS={ popupPosition }
                color={ this.state.brushColor }
                onChangeComplete={ this.chooseColor.bind(this) } />
          </ToggleDisplay>

          <ToggleDisplay show={this.state.displayBGColorPicker}>
            <ColorPicker
                type="sketch"
                positionCSS={ popupPosition }
                color= {this.state.canvasStyle.backgroundColor}
                onChangeComplete={ this.chooseBG.bind(this) } />
          </ToggleDisplay>
      </div>
    )
  }
};

export default App;

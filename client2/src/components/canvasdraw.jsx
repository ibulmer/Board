'use strict';
const React = require('react');
const ReactDOM = require('react-dom');
const PropTypes = React.PropTypes;
import axios from 'axios';

const CanvasDraw = React.createClass({
  propTypes: {
    brushColor: PropTypes.string,
    lineWidth: PropTypes.number,
    canvasStyle: PropTypes.shape({
      backgroundColor: PropTypes.string,
      cursor: PropTypes.string
    }),
    clear: PropTypes.bool
  },
  getDefaultProps() {
    return {
      brushColor: '#000000',
      lineWidth: 4,
      canvasStyle: {
        backgroundColor: '#FFFFFF',
        cursor: 'pointer'
      },
      clear: false
    };
  },
  getInitialState(){
    return {
      canvas: null,
      context: null,
      drawing: false,
      lastX: 0,
      lastY: 0,
      history: []
    };
  },
  componentDidMount(){
    let canvas = ReactDOM.findDOMNode(this);

    console.log('didMount');
    var that = this;
    this.socket = io();
    this.socket.emit('create board', 'test');
    this.socket.on('draw', function (data) {
      console.log("listening");
      that.state.context.beginPath();
      that.draw(data.lX, data.lY, data.cX, data.cY, data.color);
    });

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let ctx = canvas.getContext('2d');

    this.setState({
      canvas: canvas,
      context: ctx
    });
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.clear){
      this.resetCanvas();
    }
    if(nextProps.restore){
      this.restoreCanvas();
    }
  },
  handleOnMouseDown(e){
    let rect = this.state.canvas.getBoundingClientRect();
    this.state.context.beginPath();
    if(this.isMobile()){
      this.setState({
        lastX: e.targetTouches[0].pageX - rect.left,
        lastY: e.targetTouches[0].pageY - rect.top
      });
    } else{
      this.setState({
        lastX: e.clientX - rect.left,
        lastY: e.clientY - rect.top
      });
    }

    this.setState({
      drawing: true
    });
  },
  handleOnMouseMove(e){
    if(this.state.drawing){
      let rect = this.state.canvas.getBoundingClientRect();
      let lastX = this.state.lastX;
      let lastY = this.state.lastY;
      let currentX;
      let currentY;
      if(this.isMobile()){
        currentX =  e.targetTouches[0].pageX - rect.left;
        currentY = e.targetTouches[0].pageY - rect.top;
      }
      else{
        currentX = e.clientX - rect.left;
        currentY = e.clientY - rect.top;
      }


      this.draw(lastX, lastY, currentX, currentY);
      var that = this;
      this.socket.emit('draw', {
        lX: lastX,
        lY: lastY,
        cX: currentX,
        cY: currentY,
        color: that.props.brushColor
      });
      this.setState({
        lastX: currentX,
        lastY: currentY
      });
    }
  },
  handleonMouseUp(){
    this.setState({
      drawing: false
    });
  },

  draw(lX, lY, cX, cY, color){
    console.log('drawing');
    this.state.context.strokeStyle = color || this.props.brushColor;
    this.state.context.lineWidth = this.props.lineWidth;
    this.state.context.moveTo(lX,lY);
    this.state.context.lineTo(cX,cY);
    this.state.context.stroke();
  },
  resetCanvas(){
    let width = this.state.context.canvas.width;
    let height = this.state.context.canvas.height;
    this.state.context.clearRect(0, 0, width, height);
  },
  restoreCanvas(){
    // let width = this.state.context.canvas.width;
    // let height = this.state.context.canvas.height;
    // this.state.context.clearRect(0, 0, width, height);
    let con = this.state.context;
    let savedImage = new Image();
    axios.get('/api/boards')
      .then(function (response) {
        console.log("response data ",response.data);
        savedImage.src = response.data;
        //console.log(savedImage);

        con.drawImage(savedImage,0,0);
      })
      .catch(function (response) {
        console.log(response);
      });
  },
  getDefaultStyle(){
    return {
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    };
  },
  canvasStyle(){
    let defaults =  this.getDefaultStyle();
    let custom = this.props.canvasStyle;
    return Object.assign({}, defaults, custom);
  },
  isMobile(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      return true;
    }
    return false;
  },
  render() {
    return (
      <canvas id="canvas" style = {this.canvasStyle()}
        onMouseDown = {this.handleOnMouseDown}
        onTouchStart = {this.handleOnMouseDown}
        onMouseMove = {this.handleOnMouseMove}
        onTouchMove = {this.handleOnMouseMove}
        onMouseUp = {this.handleonMouseUp}
        onTouchEnd = {this.handleonMouseUp}
      >
      </canvas>
    );
  }

});

module.exports = CanvasDraw;

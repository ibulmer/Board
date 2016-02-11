import _ from 'underscore';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
import Navbar from './components/video_navbar';
import Webcams from '../webcam-bar';

const API_KEY = 'AIzaSyACCRzAumvvEk2O2lCmS9CZTOVWfCJhaL0';

class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: [],
      selectedVideo: null
    };
    this.sendVideoSelectData.bind(this);
    this.videoSearch('college football')
  }

  componentDidMount () {
    this.socket = io();
    console.log(this.socket);
    this.socket.on('getVid', function (data) {
      this.setState({selectedVideo: data.selectedVideo.selectedVideo});
    }.bind(this));
  }

  videoSearch(term){
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
       });
    });
  }

  sendVideoSelectData (vid) {
    this.socket.emit('sendVideoSelect', { selectedVideo: vid});
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);
    return (
     <div>
        <Webcams />
        <Navbar />
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoList onVideoSelect={
        selectedVideo => this.sendVideoSelectData({selectedVideo})}
        videos={this.state.videos} />
        <VideoDetail video={this.state.selectedVideo} />
     </div>
    )
  }
}

export default Video
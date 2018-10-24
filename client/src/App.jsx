import React, { Component } from 'react';

import { connect } from 'react-redux';

//components

import Chat from './StreamComponents/chat/ChatMain';
import LiveCodeDisplay from './StreamComponents/fileDisplay/LiveCodeDisplay.jsx';
import Video from './StreamComponents/VideoStream/VideoStream.jsx';
import Terminal from './StreamComponents/Terminal/Terminal.jsx';
import Filetree from './StreamComponents/FileTree/FileTree.jsx';
//
// import logo from './assets/logo.svg';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">

        <div className='component-container1'>
          <div className="Filetree-display">
            <Filetree />
          </div>
          <div className="Video-display">
            <Video />
          </div>
          <div className="Chat-display">
            <Chat />
          </div>
        </div>

        <div className="component-container2">
          <div className="Code-display">
            <FileDirectory />
            <LiveCodeDisplay />
          </div>
          <div className="Terminal-display">
            <Terminal />
          </div>
        </div>


      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
    //state mapping here    
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
    //dispatch actions here
  };   
}

export default connect(mapStateToProps, mapDispatchToProps)(App);



import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

//components
// import LiveStreamNow from './ElectronDashboard/LiveStreamNow.jsx';
// import ScheduleNewStream from './ElectronDashboard/ScheduleNewStream.jsx';
// import StartScheduled from './ElectronDashboard/StartScheduled.jsx';
// import ElectronDashboard from './ElectronDashboard/ElectronDashboard.jsx';
import IndexView from './ViewComponents/IndexView.jsx';

// import logo from './assets/logo.svg';

class App extends Component {
  
  
  render() {
    return (
      <div className="App">
        <IndexView />
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



import React from 'react';
import { Route } from 'react-router-dom';
import ElectronDashboard from '../ElectronDashboard/ElectronDashboard.jsx';
import LiveStreamNow from '../ElectronDashboard/LiveStreamNow.jsx';
import ScheduleNewStream from '../ElectronDashboard/ScheduleNewStream.jsx';
import StartScheduled from '../ElectronDashboard/StartScheduled.jsx';

// import { EPROTO } from 'constants';

function ReactRouter() {
  return (
    <React.Fragment>
      <Route exact path="/" component={ ElectronDashboard } />
      <Route exact path="/LiveStreamNow" component={ LiveStreamNow } />
      <Route exact path="/ScheduleNewStream" component={ ScheduleNewStream } />
      <Route exact path="/StartScheduled" component={ StartScheduled } />
    </React.Fragment>
  );
};

export default ReactRouter;
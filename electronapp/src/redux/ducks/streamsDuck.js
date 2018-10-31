const axios = require('../../../api');

// Outgoing
// async -> fetchBroadcasterStreams, postDeleteStream, postScheduledStream, putScheduledStream

// Incoming
const BROADCASTER_STREAMS_UPDATE = 'BROADCASTER_STREAMS_UPDATE';
const NEW_SCHEDULED_STREAM = 'NEW_SCEDULED_STREAM';
const UPDATE_STAGED_STREAM = 'UPDATE_STAGED_STREAM';

// Action Creator
export const updateBroadcasterStreams = (scheduledStreams) => ({ type: BROADCASTER_STREAMS_UPDATE, payload: scheduledStreams  });

export const newScheduledStream = (newStream) => ({ type: NEW_SCHEDULED_STREAM, payload: newStream });

export const stageStream = (streamID) => ({ type: UPDATE_STAGED_STREAM, payload: streamID });

// STREAM REDUCER
const initialState = {
  scheduledStreams: ['empty'],
  stagedStream: {}
};
export const streamsReducer = (state = initialState, action) => {
  switch(action.type) {
    case BROADCASTER_STREAMS_UPDATE:
      console.log('message recieved', action.payload);
      return { ...state, scheduledStreams: action.payload };

    case NEW_SCHEDULED_STREAM:
      console.log('new scheduled stream:', action.payload);
      return { ...state, scheduledStreams: [...scheduledStreams, action.payload] };

    case UPDATE_STAGED_STREAM:
      console.log('updating staged stream:', action.payload);
      const selectedStream = state.scheduledStreams
        .filter((stream) => stream.streamID === action.payload);
      return { ...state, stagedStream: selectedStream };

    default:
      return state;
  }
};

// AJAX Actions
export const fetchBroadcasterStreams = (userID) => {
  return function (dispatch) {
    axios({
      method: 'get',
      url: `/api/scheduledStreams/`
      // url: `/api/scheduledStreams?user_id=${userID}`
    }).then((streamsJSON) => {
      console.log(streamsJSON.data, 'in promise'); 
      // make array so we can map over for jsx elements
      const scheduledStreams = Object.values(streamsJSON.data);
      dispatch(updateBroadcasterStreams(scheduledStreams));
    }).catch((err) => {
      console.error('Error:', err.data);
      throw err
    });
  };
}

// TODO: refactor for passing method to action if sensible
export const postScheduledStream = (stream) => {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/scheduledStreams/',
      data: stream
    }).then((res) => {
      console.log('Post scheduled API streams success', res);
      // LinkTo Dashboard
    }).catch((err) => {
      console.error('Error: Post scheduled stream rejected:', err.data);
      // TODO: Render error element
      
    })
  }
}

export const putScheduledStream = (stream) => {
  return function (dispatch) {
    axios({
      method: 'put',
      url: '/api/scheduledStreams/',
      data: stream
    }).then((res) => {
      console.log('Put scheduled API streams success', res);
      // LinkTo Dashboard
    }).catch((err) => {
      console.error('Error: Post scheduled stream rejected:', err.data);
      // TODO: Render error element
      
    })
  }
}

export const postActiveStream = (stream) => {
  return function (dispatch) {
    axios({
      method: 'post',
      url: '/api/activeStreams/',
      data: stream
    }).then((res) => {
      console.log('Post scheduled API streams success', res);
      // LinkTo Dashboard
      // Handle rejection in components
    }).catch((err) => {
      console.error('Error: Post scheduled stream rejected:', err.data);
      // TODO: Render error element
      
    })
  }
}

export const postDeleteStream = (streamID) => {
  return function(dispatch) {
    axios({
      method: 'delete',
      url: `/api/scheduledStreams?stream_id=${streamID}`
    }).then((streamsJSON) => {
      console.log(streamsJSON.data);
    }).catch((err) => {
      console.error('Error:', err.data);
      throw err;
    });
  }
}


const counter = (state = {
  counter: 0,
  messages: [{},{}]
}, action) => {
  switch (action.type) {
  case 'INCREMENT':
    return state = state + action.payload;

  case 'DECREMENT':
    return state = state - action.payload;
  case 'ADD_MESSAGE':
  default:
    return state;
  }
};

export default counter;
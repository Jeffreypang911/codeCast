import React, { Component } from 'react';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import { messages, notifications } from './dummyMessages/messages.json';
import uuid from 'uuid/v1';
import { connect } from 'react-redux';
import { newConnection, newMessage } from '../../redux/actions/index';


function mapDispatchToProps(dispatch) {
  return {
    sendMessage: (msg) => dispatch(newMessage(msg)),
    alertConnection: () => dispatch(newConnection('New connection established from React'))
  };   
}

class Chat extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      userColor: '',
      messages: messages,
      notifications: notifications,
      connections: 0
    };
  
  }

  updateState = (entry, data) => {
    const newData = this.state[entry].concat(data);

    this.setState({ [entry]: newData });
  }

  generateRandomHexColor = () => {
    let decimal = Math.floor(Math.random()*16777215);

    let hex = (decimal < (200 * 200 * 200) && decimal > (30 * 30 * 30)) 
      ? decimal.toString(16) : this.generateRandomHexColor();
    
    this.setState({ userColor: `#${hex}` });

    return hex;
  }

  addMessage = (message) => {
    const newMsg = {
      status: 'outgoing',
      id: uuid(),
      type: 'messages',
      timestamp: new Date(),
      user: { username: this.state.currentUser, userColor: this.state.userColor },
      content: message
    };
    this.props.sendMessage(newMsg);
    this.setState({ messages: this.state.messages.concat(newMsg)});
  }

  addNotification = (notification) => {
    const newNote = {
      status: 'outgoing',
      id: uuid(),
      type: 'notifications',
      timestamp: new Date(),
      content: notification
    };
    this.props.sendMessage(newNote);
    this.setState({ notifications: this.state.notifications.concat(newNote) });
  }

  updateCurrentUser = (user) => {
    const oldUsername = this.state.currentUser;
    
    this.setState({ 'currentUser': user }, () => {
      this.addNotification(`'${oldUsername}' changed their name to '${this.state.currentUser}'`);
    }); 
  }

  componentDidMount() {
    this.generateRandomHexColor();
    this.props.alertConnection();
    
  }

  render() {
    return (
      <div className='chat-main'>
        <div className='chat-container'>
          <Messages>
            <MessageList uuid={ uuid } 
              images={ this.state.images } 
              notifications={ this.state.notifications } 
              messages={ this.state.messages } 
            />
            <Chatbar addMessage={ this.addMessage } 
              updateCurrentUser={ this.updateCurrentUser } 
              currentUser={ this.state.currentUser } 
            />
          </Messages>
        </div>
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(Chat);

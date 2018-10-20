import React, { Component } from 'react';
import Messages from './Message.jsx';
import MessageList from './MessageList.jsx';
import Chatbar from './ChatBar.jsx';
import { messages, notifications } from './dummyMessages/messages.json';
import uuid from 'uuid/v1';



class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: 'Anonymous',
      userColor: '',
      messages: messages,
      notifications: notifications
    };
    // this.socket = new WebSocket('ws://localhost:3001');
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
    this.setState({ notifications: this.state.notifications.concat(newNote)});
  }

  updateCurrentUser = (user) => {
    const oldUsername = this.state.currentUser;
    
    this.setState({'currentUser': user}, () => {
      this.addNotification(`'${oldUsername}' changed their name to '${this.state.currentUser}'`);
    }); 
  }

  componentDidMount() {
    this.generateRandomHexColor();

    // this.sock.onerror = (err) => {throw err;};

    // this.sock.onopen = () => {
    //   this.sock.send('YEET');
    // };

    // this.sock.onmessage = (event) => {
    //   let dataString = event.data;
    //   let data = JSON.parse(dataString);
      
    //   data.type === 'connections' ? this.setState({'connections': data.content}) : this.updateState(data.type, data); 
    // };
  }

  render() {
    return (
      <div className='chat-main'>
        <div className='chat-container'>
          <Messages>
            <MessageList uuid={ uuid } images={ this.state.images } notifications={ this.state.notifications } messages={ this.state.messages } />
            <Chatbar addMessage={ this.addMessage } updateCurrentUser={ this.updateCurrentUser } currentUser={ this.state.currentUser } />
          </Messages>
        </div>
      </div>
    );
  }
}

export default App;

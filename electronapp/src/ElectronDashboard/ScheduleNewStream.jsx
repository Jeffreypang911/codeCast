import React from 'react';
import { Button } from 'antd';
import { Input, Select, DatePicker } from 'antd';
import { connect } from 'react-redux'; 

import { postScheduledStream } from '../redux/ducks/streamsDuck.js'
import { Router, withRouter, Link, Redirect } from 'react-router-dom';

const InputGroup = Input.Group;
const Option = Select.Option;

class ScheduleNewStream extends React.Component {

  constructor() {
    super();
    this.state = {
      title: 'Title your stream...',
      userID: 'userID',
      user: 'userName',
      description: 'What are you coding today?',
      scheduledDate: 'NOW!',
      languageImage: 'javascript'
    };
  }

  //handlers
  TitleOnChange = (event) => {
    this.setState({title: event.target.value});
  }
  
  DescriptionOnChange = (event) => {
    this.setState({description: event.target.value})
  }

  onChange = (value) => {
    this.setState({scheduledDate: value})
  }
  
  onOk = (value) => {
    this.setState({scheduledDate: value['_d']})
    // console.log('onOk: ', value);
  }

  HandleImageSelection = (value) => {
    this.setState({languageImage: value});
    console.log(value)
  }

  HandleSubmit = (event) => {
    event.preventDefault();
    //redirect to broadcast page
    this.props.postScheduledStream(this.state);
    console.log(this.state)
    this.props.history.push('/');
  }

  render() {  
    
    return (

        <main className="new-stream">
          <header className="header">
            <Link to='/' id="dashboard-btn">Dashboard</Link>
            <div className="logoPlaceholder">p</div>
          </header>
          <div className="inputs-container">
            <h1>New Scheduled Stream</h1>

            <div className="forms-container">
              <form id="form" onSubmit={this.HandleSubmit}>
                <div className="title-input">
                  <h3>Title:</h3>
                  <input type="text" title={this.state.title} onChange={this.TitleOnChange} />
                </div>
                <div className="description-input">
                  <h3>Description:</h3>
                  <textarea type="text" rows="4" cols="90" description={this.state.description} onChange={this.DescriptionOnChange} />
                </div>
                <div className=" bottom-container">
                  <DatePicker
                    className="date-selection"
                    showTime
                    format="YYYY-MM-DD HH:mm:ss"
                    placeholder="Select Time"
                    onChange={this.onChange}
                    onOk={this.onOk}
                  />
                  {/* Language image selector */}
                  <InputGroup compact>
                    <Select className="image-select" defaultValue="default" onChange={this.HandleImageSelection}>
                      <Option value="default">----</Option>
                      <Option value="javascript">JavaScript</Option>
                      <Option value="ruby">Ruby</Option>
                    </Select>
                  </InputGroup>
                  <input type="submit" value="Submit" />
                </div>
              </form>
            </div>
          </div>
        </main>
      
    );
  }
}

// leave in 

// const mapStateToProps = (state) => {
//   return {
//     userID: state.user.userID
//   }
// }

const mapDispatchToProps = (dispatch) => {
  return {
    postScheduledStream: (streamData) => dispatch(postScheduledStream(streamData))
  }
}


export default withRouter(connect(null, mapDispatchToProps)(ScheduleNewStream));


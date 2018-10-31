import React, { Component } from 'react';  
import { connect } from 'react-redux';
import rubyImg from '../../../images/ruby.png';
import phpImg from '../../../images/php.png';
import pythonImg from '../../../images/python.png';
import javascriptImg from '../../../images/javascript.png';
import csharpImg from '../../../images/csharp.png';
import htmlcssImg from '../../../images/htmlcss.png';
import { fetchScheduledStreams } from '../../../redux/ducks/streamsDuck.js';
import { withRouter } from 'react-router-dom';

class ScheduledStreams extends Component {

  componentDidMount() {
    this.props.fetchScheduledStreams();
  }


  MakeStreamCard = (props) => {
    const { title, user, description, scheduledDate, languageImage } = props;

    let image
    if (languageImage === 'javascript') {
      image = javascriptImg
    }
    if (languageImage === 'ruby') {
      image = rubyImg
    }
    if (languageImage === 'csshtml') {
      image = htmlcssImg
    }
    if (languageImage === 'csharp') {
      image = csharpImg
    }
    if (languageImage === 'python') {
      image = pythonImg
    }
    if (languageImage === 'php') {
      image = phpImg
    }

    return (
      <div className="currentStream" key={(Math.random()*10).toString().slice(2,6)}>
        <div className="currentStreamBanner">
          <h3>{ title }</h3>
          <h4>{ user }</h4>
          <h5>{ scheduledDate }</h5>
          <img className="imagePlaceholder" src={ image } />
        </div>
        <p>{ description }</p>
      </div>
    )
  }

  render() {
    const renderStreams = this.props.scheduledStreams
      .map((stream) => this.MakeStreamCard(stream));

    return (
      <main className="streams">
        { renderStreams }
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scheduledStreams: state.streams.scheduledStreams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchScheduledStreams: () => dispatch(fetchScheduledStreams())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ScheduledStreams));
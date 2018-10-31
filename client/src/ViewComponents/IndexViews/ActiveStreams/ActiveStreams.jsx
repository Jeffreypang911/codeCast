import React, { Component } from 'react';  
import { connect } from 'react-redux';  
import rubyImg from '../../../images/ruby.png';
import phpImg from '../../../images/php.png';
import pythonImg from '../../../images/python.png';
import javascriptImg from '../../../images/javascript.png';
import csharpImg from '../../../images/csharp.png';
import htmlcssImg from '../../../images/htmlcss.png';
import { fetchActiveStreams } from '../../../redux/ducks/streamsDuck.js';
import { withRouter } from 'react-router-dom';


class ActiveStreams extends Component {  

  componentDidMount() {
    console.log("Spaghetti");
    this.props.fetchActiveStreams();
  }

  GetStreamId = (streamClicked) => {
    console.log(streamClicked);
  }


  MakeActiveStreamCard = (props) => {
    const { title, user, description, streamID, languageImage } = props;
    // missing image path
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
      <div className="activeStreamCard" key={ streamID } onClick={ () => this.GetStreamId( streamID) }>
        <div className="banner">
          <div>
            <h1>{ title }</h1>
            <h2>{ user }</h2>
          </div>
          <img className="imagePlaceholder" src={ image } />
        </div>
        <div className="description-container">
          { description }
        </div>
      </div>
    )
  }

  render() {
    const renderStreams = this.props.activeStreams.map( (stream) => {
      return this.MakeActiveStreamCard(stream);  
    });

    return (
      <main className="streams">
        { renderStreams }
      </main>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    activeStreams: state.streams.activeStreams
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchActiveStreams: () => dispatch(fetchActiveStreams())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ActiveStreams));
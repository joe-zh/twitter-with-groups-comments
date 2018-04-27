import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoriteTweet } from '../actions/tweetActions';
import { Link } from 'react-router-dom';

class Response extends Component {
  constructor(props) {
    super(props);
  }

  render() {    
    let { authorId, authorName, authorPic, content, 
          respondingTo, responseId } = this.props.content;
    let cardStyles = {
      marginTop: '10px',
      marginBottom: '10px',
      padding: '5px',
    };
    let favoriteStyles = {
      color: '#FFF',
    };
    let imgStyles = {
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      marginRight: '10px',
    };
    let authorUrl = `/profile/${authorId}`;
    let image = authorPic ? authorPic : 'https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg';

    return (
      <div className="card" style={cardStyles}>
        <h5 className="card-title">
          <img src={image} style={imgStyles} />
          <Link to={authorUrl}> { authorName } </Link>
        </h5>
        <p>
          { content }
        </p>
      </div>
    );
    
  }
}

const mapDispatchToProps = dispatch => ({
});

/*
const mapStateToProps = (state, ownProps) => {
  let tweetReducer = state.tweet[ownProps.id];
  return tweetReducer;
}; */

export default connect(
  null,
  null
)(Response);

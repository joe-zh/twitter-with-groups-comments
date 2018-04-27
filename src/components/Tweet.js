import React, { Component } from 'react';
import { connect } from 'react-redux';
import { favoriteTweet } from '../actions/tweetActions';
import { Link } from 'react-router-dom';
import CreateResponseBox from './CreateResponseBox';
import Response from './Response';

class Tweet extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { tweetId, authorName, authorId, authorPic, content, 
          isFavorited, numFavorites, responses, responseArr } = this.props;
    let cardStyles = {
      marginBottom: '40px',
      padding: '10px',
    };
    let favoriteStyles = {
      color: '#FFF',
    };
    let imgStyles = {
      borderRadius: '50%',
      width: '50px',
      height: '50px',
      marginRight: '10px',
    };
    let authorUrl = `/profile/${authorId}`;
    let image = authorPic ? authorPic : 'https://files.allaboutbirds.net/wp-content/uploads/2015/06/prow-featured.jpg';
    let favoriteText = (isFavorited ? 'Unfavorite' : 'Favorite') + ' tweet';

    let responseArray = [];
    for (var i = 0; i < responses.length; i++) {
      responseArray.push(<Response id={responses[i]} key={i} content={responseArr[i]}/>);
    }

    return (
      <div className="card" style={cardStyles}>
        <h5 className="card-title">
          <img src={image} style={imgStyles} />
          <Link to={authorUrl}> { authorName } </Link>
        </h5>
        <p>
          { content }
        </p>
        <a
          onClick={() => this.props.favoriteTweet(tweetId)}
          style={favoriteStyles}
          className="btn btn-primary"
        >
          { favoriteText }
        </a>
        <span>This tweet has been favorited { numFavorites } time(s)</span>
        <div className="responses">
          { responseArray }
        </div>
        <CreateResponseBox id = {tweetId}/>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  favoriteTweet: (tweetId) => dispatch(favoriteTweet(tweetId)),
});

const mapStateToProps = (state, ownProps) => {
  let tweetReducer = state.tweet[ownProps.id];
  return tweetReducer;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tweet);

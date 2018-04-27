import React, { Component } from 'react';
import TweetList from './TweetList';
import DiscoverBirds from './DiscoverBirds';
import DiscoverGroups from './DiscoverGroups';
import { connect } from 'react-redux';
import { loadTweets, getDiscoverBirds } from '../actions/tweetActions';
import { getDiscoverGroups } from '../actions/groupActions';

class NewsFeed extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="container">
        <h2>News Feed</h2>
        <div className="row">
          <div className="col-md-4">
            <DiscoverBirds getDiscoverBirds = {this.props.getDiscoverBirds} />
            <DiscoverGroups getDiscoverGroups = {this.props.getDiscoverGroups} />
          </div>
          <div className="col-md-8">
            <TweetList loadTweets = { this.props.loadTweets } />
          </div>
        </div>
      </div>
    );
  }
}


const mapDispatchToProps = dispatch => ({
  loadTweets: () => dispatch(loadTweets()),
  getDiscoverBirds: () => dispatch(getDiscoverBirds()),
  getDiscoverGroups: () => dispatch(getDiscoverGroups()),
});

export default connect(null, mapDispatchToProps)(NewsFeed);

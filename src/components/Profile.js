import React, { Component } from 'react';
import TweetList from './TweetList';
import ProfileBox from './ProfileBox';
import CreateTweetBox from './CreateTweetBox';
import { loadTweetsForProfile } from '../actions/tweetActions';
import { getUser, favUnfav } from '../actions/profileActions';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let TweetBox;
    if (!this.props.match.params.id) {
      TweetBox = <CreateTweetBox />;
    } 
    return (
      <div className="container">
        <h2>Profile</h2>
        <div className="row">
          <div className="col-md-4">
            <ProfileBox id = {this.props.match.params.id} user = {() => this.props.getUser(this.props.match.params.id)} 
                favUnfav = {() => this.props.favUnfav(this.props.match.params.id)}/>
          </div>
          <div className="col-md-8">
            {TweetBox}
            <TweetList loadTweets = {() => this.props.loadTweetsForProfile(this.props.match.params.id)}/>
          </div>
        </div>
      </div>
    );
  }
}
  // optionally use this to handle assigning dispatch actions to props
const mapDispatchToProps = (dispatch) => {
  //console.log(ownProps.match.params.id)
  return {
    getUser: (id) => dispatch(getUser(id)),
    favUnfav: (id) => dispatch(favUnfav(id)),
    loadTweetsForProfile: (id) => dispatch(loadTweetsForProfile(id)),
  }
};


export default connect(null, mapDispatchToProps)(Profile);

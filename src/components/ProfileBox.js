import React, { Component } from 'react';
import TweetList from './TweetList';
import { loadTweetsForProfile } from '../actions/tweetActions';
import { connect } from 'react-redux';

class ProfileBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.user();
  }
  
  render() {
    let button = this.props.id ?
      (
        <button className="btn btn-primary" onClick={this.props.favUnfav}>
          { this.props.profile.isFollowing === true ? 'Unfollow' : 'Follow' }
        </button>
      ) : '';
    let followersLength = this.props.profile.followers ? this.props.profile.followers.length : 0;
    let followingLength = this.props.profile.following ? this.props.profile.following.length : 0;
    return (
      <div className="card">
        <img className="card-img-top" src={this.props.profile.image} />
        <div className="card-body">
          <div className="card-title">
            { this.props.profile.name }
          </div>
          <p className="text-muted">
            { this.props.profile.species }
          </p>
          <br /> Followers:
          { followersLength }
          <br /> Following:
          { followingLength }
          <br />
          { button }
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  profile: state.profileReducer.profile,
});

export default connect(mapStateToProps, null)(ProfileBox);

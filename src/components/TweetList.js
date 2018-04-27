import React, { Component } from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class TweetList extends Component {
  constructor() {
    super();
    this.state = {intervalID: null};
  }
  componentDidMount() {
    this.props.loadTweets();
    this.setState({ intervalID: setInterval(() => this.props.loadTweets(), 2500) });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    let tweets = [];
    for (var i = 0; i < this.props.ids.length; i++) {
      tweets.push(<Tweet id={this.props.ids[i]} key={i} />);
    }
    return (
      <div className="col-md-12">
        {tweets}
      </div>
    );    
  }
}

const mapStateToProps = state => state.tweetList;

export default connect(
  mapStateToProps,
  null
)(TweetList);

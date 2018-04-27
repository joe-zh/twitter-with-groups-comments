import React, { Component } from 'react';
import TweetList from './TweetList';
import GroupBox from './GroupBox';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTweetsForGroup, joinUnjoin, getGroup } from '../actions/groupActions';


class Group extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <h2>Group</h2>
        <div className="row">
          <div className="col-md-4">
            <GroupBox id = {this.props.match.params.id} 
                      group = {() => this.props.getGroup(this.props.match.params.id)}
                      favUnfav = {() => this.props.joinUnjoin(this.props.match.params.id)}/>
            <Link to={{pathname:`/edit-group/${this.props.match.params.id}`, 
                        state: {id:this.props.match.params.id} }} >Edit Group</Link>
          </div>
          <div className="col-md-8">
            <TweetList loadTweets = {() => this.props.loadTweetsForGroup(this.props.match.params.id)}/>
          </div>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    joinUnjoin: (id) => dispatch(joinUnjoin(id)),
    getGroup: (id) => dispatch(getGroup(id)),
    loadTweetsForGroup: (id) => dispatch(loadTweetsForGroup(id)),
  }
};


export default connect(null, mapDispatchToProps)(Group);

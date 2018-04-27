import React, { Component } from 'react';
import TweetList from './TweetList';
import { loadTweetsForGroup } from '../actions/groupActions';
import { connect } from 'react-redux';

class GroupBox extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.group();
  }
  
  render() {
    let button = this.props.id ?
      (
        <button className="btn btn-primary" onClick={this.props.favUnfav}>
          { this.props.userGroup.isJoined === true ? 'Leave' : 'Join' }
        </button>
      ) : '';
    let groupSize = this.props.userGroup.users ? this.props.userGroup.users.length : 0;
    return (
      <div className="card">
        <div className="card-body">
          <div className="text-muted">
            Group Admin: { this.props.userGroup.adminName }
          </div>
          <div className="text-muted">
            Group Name: { this.props.userGroup.name }
          </div>
          <p className="text-muted">
            Group Description: { this.props.userGroup.description }
          </p>
          <br /> Group Users: { groupSize }
          <br /> { button }
          <br />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userGroup: state.groupReducer.group,
});


export default connect(mapStateToProps, null)(GroupBox);

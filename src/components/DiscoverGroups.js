import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class DiscoverGroups extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.getDiscoverGroups();
  }

  render() {
    let groups = [];
    this.props.discovers.map((i, idx) => {
      let groupUrl = `/group/${i.id}`;
      groups.push(
        <div key={idx}>
          <a href={groupUrl}>
            { i.name }
          </a>
        </div>
      );
    });

    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Discover Groups</h3>
          { groups }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  let { discoverGroupReducer } = state;
  return discoverGroupReducer;
};



export default connect(mapStateToProps, null)(DiscoverGroups);

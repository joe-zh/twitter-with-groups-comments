import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class DiscoverBirds extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    // once the component mounts, call the function
    // that allows you to discover birds (hint refer to the
    // properties of the component
    this.props.getDiscoverBirds();
  }

  render() {
    let users = [];
    this.props.discovers.map((i, idx) => {
      let authorUrl = `/profile/${i.id}`;
      users.push(
        <div key={idx}>
          <a href={authorUrl}>
            { i.name }
          </a>
        </div>
      );
    });

    return (
      <div className="card">
        <div className="card-body">
          <h3 className="card-title">Discover Birds</h3>
          { users }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => {
  let { discoverReducer } = state;
  return discoverReducer;
};
  // only return the discoverReducer here



export default connect(mapStateToProps, null)(DiscoverBirds);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class NavBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <a className="navbar-brand" href="#">Twitter for BIRDS</a>
        { this.props.isAuthenticated ?
          (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/feed">
                  Feed
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/edit-profile">
                  Edit Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  My Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-group">
                  Create Group
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/signx">
                  Sign In/Up
                </Link>
              </li>
            </ul>
          ) }
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  let { authReducer } = state;
  return authReducer;
};

export default connect(mapStateToProps, null)(NavBar);

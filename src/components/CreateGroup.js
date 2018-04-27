import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createNewGroup } from '../actions/groupActions';
import { withRouter } from 'react-router-dom';

class CreateGroup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      this.props.history.push('/feed');
    }
  }

  createGroup(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let description = this.refs.description.value;
    this.props.createNewGroup({name, description});
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.createGroup.bind(this)}>
              <div className="form-group">
                <label>
                  Name:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="name"
                />
              </div>
              <div className="form-group">
                <label>
                  Description:
                </label>
                <input
                  className="form-control"
                  type="text"
                  ref="description"
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Create Group!"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createNewGroup: (content) => dispatch(createNewGroup(content)),
});


export default connect(null, mapDispatchToProps)(CreateGroup);

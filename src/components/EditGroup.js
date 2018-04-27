import React, { Component } from 'react';
import { updateGroup } from '../actions/groupActions';
import { connect } from 'react-redux';

class EditGroup extends Component {
  constructor(props) {
    super(props);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm(e) {
    e.preventDefault();
    let data = {
      name: this.refs.name.value,
      description: this.refs.description.value,
    };
    this.props.updateGroup(this.props.location.state.id, data);
  }

  render() {
    return (
      <div className="container">
        <h2>Update Group Info:</h2>
        <form onSubmit={this.submitForm}>
          <div className="form-group">
            <label>
              Group Name:
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
              value="Make Edits"
            />
          </div>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  updateGroup: (data) => dispatch(updateGroup(data)),
});

export default connect(null, mapDispatchToProps)(EditGroup);

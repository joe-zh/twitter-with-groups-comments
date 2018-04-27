import React, { Component } from 'react';
import { connect } from 'react-redux';
import { respondToTweet } from '../actions/tweetActions';

class CreateResponseBox extends Component {
  constructor(props) {
    super(props);
    this.submitResponse = this.submitResponse.bind(this);
  }

  submitResponse(e) {
    e.preventDefault();
    let tweetContent = this.refs.newResponse.value;
    this.props.respondToTweet(this.props.id, tweetContent);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitResponse}>
          <div>
            <div className="form-group">
              <input className="form-control" ref="newResponse"></input>
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Respond to Tweet!"
            />
          </div>
        </form>
      </div>
    );
  }
}


const mapDispatchToProps = (dispatch) => ({
  respondToTweet: (id, content) => dispatch(respondToTweet(id, content)),
});

export default connect(
  null,
  mapDispatchToProps
)(CreateResponseBox);

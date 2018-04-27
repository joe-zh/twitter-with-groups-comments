import React, { Component } from 'react';
import { connect } from 'react-redux';


class Flashes extends Component {
  constructor() {
    super();
  }

  render() {
    // ultimate html structure will look like
    // <div>
    //  <div class="alert alert-danger">${message.toString()}. Click to dismiss.</div>
    //  <div class="alert alert-info">${message.toString()}. Click to dismiss.</div>
    //  ...
    // </div>
    let messages = this.props.messages.map((i, idx) => {
      let alertInfo = 'alert ' + (i.messageType === 'error' ? 'alert-danger' : 'alert-info');
      return (
        <div
          className={alertInfo}
          key={idx}
          id={idx}
          onClick={() => this.props.dismiss(idx)}
        >
          { i.message.toString() }. Click to dismiss.
        </div>
      );
    });
    return (
      <div>
        { messages }
      </div>
    );
  }
}

// needs to somehow listen to the state of messageReducer via its props.
// you could almost say you're mapping the state to props...
const mapStateToProps = (state) => {
  let { messageReducer } = state;
  // let messageReducer = state.messageReducer;
  return messageReducer;
};

// map a prop `dispatch` that will dispatch an action
// { type: 'DISMISS',  idx: someIndex }
// ultimate call to it should look like this.props.dismiss(idx)
const mapDispatchToProps = dispatch => ({
  dismiss: (idx) => dispatch({ type: 'DISMISS', idx: idx }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flashes);

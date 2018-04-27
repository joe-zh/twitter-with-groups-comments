import {
  DISCOVERGROUPS_FUL,
} from '../actions/groupActions';

// create a reducer function called discoverReducerw ith initialState
// { discovers: [] }
// if the action passed in is DISCOVERBIRDS_FUL then set discovers equal
// to the data  of that action (refer to the action caller for details on
// what that means. else just return the state
//
const discoverGroupReducer = (state = { discovers: []}, action) => {
  let discovers;
  if (action.type == DISCOVERGROUPS_FUL) {
    discovers = action.data;
    return {discovers: discovers};
  }
  return state;
};

export default discoverGroupReducer;

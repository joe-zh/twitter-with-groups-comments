import {
  UPDATEGROUP_FUL,
  GETGROUP_FUL,
  FAVUNFAV_FUL,
  CREATEGROUPS_FUL,
} from '../actions/groupActions';

let initialState = {
  group: {
    admin: '',
    adminName: '',
    name: '',
    description: '',
    users: [],
    isJoined: false,
  },
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
  case UPDATEGROUP_FUL:
    return {
      state,
      group: Object.assign({}, state.group, action.group),
    };
  case GETGROUP_FUL:
    return {
      state,
      group: action.group,
    };
  case CREATEGROUPS_FUL:
    return {
      state,
      group: Object.assign({}, state.group, action.group),
    }
  case FAVUNFAV_FUL:
    return {
      state,
      group: Object.assign({}, state.group, action.group),
    };
  default:
    return state;
  }
};

export default groupReducer;

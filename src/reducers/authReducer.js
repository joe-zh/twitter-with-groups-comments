import {
  LOGIN_FUL,
  LOGIN_REJ,
  LOGOUT_FUL,
  REGISTER_FUL,
  REGISTER_REJ,
} from '../actions/auth';

// create a reducer function called `auth` with initialState
// { isAuthenticated: localStorage.getItem('token')  ? true : false }
//  and if the actions dispatched are
//  LOGIN_FUL or REGISTER_FUL, set isAuthenticated to true
//  If the action dispatch is
//  REGISTER_REJ, LOGOUT_FUL, LOGIN_REJ
//  set isAuthenticated to false
//  when i say "set" i mean in the state
//  if none of these actions are matched, just return the state
const auth = (state = { isAuthenticated: localStorage.getItem('token')  ? true : false }, action) => {
  switch(action.type) {
  case LOGIN_FUL:
    return { isAuthenticated: true };
  case LOGIN_REJ:
    return { isAuthenticated: false };
  case LOGOUT_FUL:
    return { isAuthenticated: false };
  case REGISTER_FUL:
    return { isAuthenticated: true };
  case REGISTER_REJ:
    return { isAuthenticated: false };
  default:
    return state;
  }
}

export default auth;

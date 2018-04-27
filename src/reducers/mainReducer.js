import { combineReducers } from 'redux';
import authReducer from './authReducer';
import tweetListReducer from './tweetListReducer';
import tweetReducer from './tweetReducer';
import profileReducer from './profileReducer';
import messageReducer from './messageReducer';
import discoverReducer from './discoverReducer';
import discoverGroupReducer from './discoverGroupReducer';
import groupReducer from './groupReducer';


// you should somehow * combine reducers * hint hint
// so that the reducer looks like
// {
//  authReducer: authReducer
//  tweetList: tweetListReducer
//  tweet: tweetReducer
//  profileReducer: profileReducer
//  messageReducer: messageReducer
//  discoverReducer
// }
// store this reducer in a variable 'tweetApp'
var tweetApp = combineReducers({ 
    authReducer: authReducer, 
    messageReducer: messageReducer,
    tweetList: tweetListReducer,
    tweet: tweetReducer,
    discoverReducer: discoverReducer,
    profileReducer: profileReducer,
    groupReducer: groupReducer,
    discoverGroupReducer: discoverGroupReducer
});

export default tweetApp;

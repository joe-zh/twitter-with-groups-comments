import {
  LOADTWEETS_FUL,
} from '../actions/tweetActions';

// createa  reducer function named tweetListReducer with initial state
// { ids: [] }.
// When the LOADTWEETS_FUL action occurs, set ids equal to just the tweetId
// for all the tweets from the action
var tweetListReducer = (state = { ids: [] }, action) => {
  if (action.type == LOADTWEETS_FUL) {
    let tweetList = [];
    let data = action.tweets;
    for (var i = 0; i < data.length; i++) {
      tweetList.push(data[i].tweetId);
    }
    return {ids: tweetList};
  }

  return state;
};
export default tweetListReducer;

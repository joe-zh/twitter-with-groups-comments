import {
  LOADTWEETS_FUL,
  CREATETWEET_FUL,
  FAVORITE_FUL,
} from '../actions/tweetActions';

// createa  reducer called tweetReducer that has an initalState {}
// if the LOADTWEETS_FUL action occurs, make sure that your eventual
// state would look like
// {
//  whateverTheTweetId: { fullTweetObj },
//  whateverTheTweetId2: { fullTweetobj2 }
//  ...
// }
// basically i should be able to do state[someTweetId] and get the
// full tweet object containing that tweet
// on the CREATETWEET_FUL and FAVORITE_FUL actions, just  set the
// tweet in the state equal to the data you get from the action

const tweetReducer = (state = {}, action) => {
  let s;
  let tweet;
  let tweetId;
  switch(action.type) {
    case LOADTWEETS_FUL:
      s = {};
      let tweets = action.tweets;
      for (var i = 0; i < tweets.length; i++) {
        tweet = tweets[i];
        tweetId = tweet.tweetId;
        s[tweetId] = tweet;
      }
      return s;
    case CREATETWEET_FUL:
      s = Object.assign({}, state);
      tweet = action.data;
      tweetId = tweet.tweetId;
      s[tweetId] = tweet;
      return s;
    case FAVORITE_FUL:
      s = Object.assign({}, state);
      tweet = action.data;
      tweetId = tweet.tweetId;
      s[tweetId] = tweet;
      return s;
  }  
  return state;
};

export default tweetReducer;
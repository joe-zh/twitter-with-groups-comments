import authenticatedRequest from '../utils/authenticatedRequest';

export const FAVORITE_REJ = 'FAVORITE_REJ';
export const FAVORITE_FUL = 'FAVORITE_FUL';

export const LOADTWEETS_REJ = 'LOADTWEETS_REJ';
export const LOADTWEETS_FUL = 'LOADTWEETS_FUL';

export const CREATETWEET_FUL = 'CREATETWEET_FUL';
export const CREATETWEET_REJ = 'CREATETWEET_REJ';

export const RESPONDTWEET_FUL = 'RESPONDTWEET_FUL';
export const RESPONDTWEET_REJ = 'RESPONDTWEET_REJ';

export const DISCOVERBIRDS_FUL = 'DISCOVERBIRDS_FUL';
export const DISCOVERBIRDS_REJ = 'DISCOVERBIRDS_REJ';
// 
// loadTweet()
export function loadTweets() {
  // loads tweets from /api/newsfeed ie *get the tweets* from that url
  // async action creator
  return getTweets('api/newsfeed');
}

// this is  a helper method you can use to getTweets from a given URL.
function getTweets(url) {
  return (dispatch) => {
    authenticatedRequest('GET', url)
      .then(res => res.json())
      .then((resp) => {
        dispatch({
          type: LOADTWEETS_FUL,
          tweets: resp.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: LOADTWEETS_REJ,
          error,
        });
      });
  };
}


export function loadTweetsForProfile(userId) {
  // will send  a request to /api/profile/userId/tweets if a userId is specified
  // else it will just send a request to /api/profile/tweets
  // then should *get the Tweets*  (hint hint) from that url
  // async action creator
  let url = '';
  if (userId) {
    url = `/api/profile/${userId}/tweets`;
  } else {
    url = '/api/profile/tweets';
  }
  return getTweets(url);
}


export function favoriteTweet(tweetId) {
  // authenticated request example
  // we send a POST request that is authenticated to /api/tweet/${tweetId}/favorite
  // if the request is successful we send  a FAVORITE_FUL action with message  and some  data
  // from the  response (determined by express)
  return (dispatch) => {
    authenticatedRequest('POST', `/api/tweet/${tweetId}/favorite`)
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        dispatch({
          type: FAVORITE_FUL,
          message: 'You have favorited this tweet',
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAVORITE_REJ,
          error,
        });
      });
  };
}


export function createNewTweet(tweetContent) {
  // we send a POST request that is authenticated to /api/tweet
  // if the request is successful we send  a CREATETWEET_FUL action with message and some data
  // corresponding  to the new tweet (we get it from the response (determined by express))
  // if there is  an error, dispatch a CREATETWEET_REJ error
  return (dispatch) => {
    authenticatedRequest('POST', '/api/tweet', {content: tweetContent})
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        dispatch({
          type: CREATETWEET_FUL,
          message: 'You have created a tweet',
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATETWEET_REJ,
          error,
        });
      });
  };
}

export function respondToTweet(tweetId, responseContent) {
  // we send a POST request that is authenticated to /api/tweet
  // if the request is successful we send  a CREATETWEET_FUL action with message and some data
  // corresponding  to the new tweet (we get it from the response (determined by express))
  // if there is  an error, dispatch a CREATETWEET_REJ error
  return (dispatch) => {
    authenticatedRequest('POST', `/api/tweet/${tweetId}`, {content: responseContent})
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        dispatch({
          type: RESPONDTWEET_FUL,
          message: 'You have responded to a tweet',
          data,
        });
      })
      .catch((error) => {
        dispatch({
          type: RESPONDTWEET_REJ,
          error,
        });
      });
  };
}

export function getDiscoverBirds() {
  return dispatch => authenticatedRequest('GET', '/api/newsfeed/discover-birds')
    .then(res => res.json())
    .then((resp) => {
      const users = resp.data;
      dispatch({
        type: DISCOVERBIRDS_FUL,
        data: users,
      });
    })
    .catch((error) => {
      dispatch({
        type: DISCOVERBIRDS_REJ,
        message: 'Error fetching birds',
        error,
      });
    });
}

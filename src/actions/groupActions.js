import authenticatedRequest from '../utils/authenticatedRequest';

export const UPDATEGROUP_FUL = 'UPDATEGROUP_FUL';
export const UPDATEGROUP_REJ = 'UPDATEGROUP_REJ';

export const GETGROUP_FUL = 'GETGROUP_FUL';
export const GETGROUP_REJ = 'GETGROUP_REJ';

export const FAVUNFAV_FUL = 'FAVUNFAV_FUL';
export const FAVUNFAV_REJ = 'FAVUNFAV_REJ';

export const DISCOVERGROUPS_FUL = 'DISCOVERGROUPS_FUL';
export const DISCOVERGROUPS_REJ = 'DISCOVERGROUPS_REJ';

export const CREATEGROUPS_FUL = 'CREATEGROUPS_FUL';
export const CREATEGROUPS_REJ = 'CREATEGROUPS_REJ';

export const LOADTWEETS_REJ = 'LOADTWEETS_REJ';
export const LOADTWEETS_FUL = 'LOADTWEETS_FUL';

export function createNewGroup(data) {
  return (dispatch) => {
    authenticatedRequest('POST', '/api/group', data)
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        dispatch({
          type: CREATEGROUPS_FUL,
          message: 'You have created a group',
          group: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CREATEGROUPS_REJ,
          error,
        });
      });
  };
}

export function updateGroup(id, data) {
  return (dispatch) => {
    authenticatedRequest('POST', `/api/group/${id}/edit`, data)
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        let group = {name: data.name, description: data.description};        
        dispatch({
          type: UPDATEGROUP_FUL,
          message: 'You have updated your group and can now check it',
          group: group
        });
      })
      .catch((error) => {
        dispatch({
          type: UPDATEGROUP_REJ,
          error,
        });
      });
  };
}

export function loadTweetsForGroup(groupId) {
  // will send  a request to /api/profile/userId/tweets if a userId is specified
  // else it will just send a request to /api/profile/tweets
  // then should *get the Tweets*  (hint hint) from that url
  // async action creator
  let url = `/api/group/${groupId}/tweets`;
  return getTweets(url);
}

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



export function getGroup(id) {
  // async action creator again
  // make an authenticated request to the route  that allows us to get profile
  // information. (you can ref your express files for this to see what type  of
  // request it is and the url pattern (note that you need to handle the case where
  // id is empty/undefined and adjust the url accordingly
  // When the request is successful, dispatch a GETPROFILE_FUL action with additional
  // property `profile` containing  the result of the request relevant (ref your express
  // method for what is returned)
  // if there's  an error, dispatch a GETPROFILE_REJ action with an addition property `error`
  // equal to the error
  let url = `/api/group/${id}/info`;
  return dispatch => authenticatedRequest('GET', url)
  .then(res => {
    return res.json()
  })
  .then((res) => {
    const data = res.data;
    console.log(data);
    let group = {admin: data.admin, adminName: data.adminName, name: data.name, 
                  description: data.description, users: data.users, isJoined: data.isJoined};
    dispatch({
      type: GETGROUP_FUL,
      group: group
    });
  })
  .catch((error) => {
    dispatch({
      type: GETGROUP_REJ,
      error,
    });
  });
}


export function joinUnjoin(id) {
  // async action creator again
  // make an authenticated request to the route that allows us to follow
  // a user. when this returns, dispatch  a new FAVUNFAV_FUL action with properties
  // profile equal to the response data and also  a message property that says
  // 'You are now ' + following or unfollowing + ' this person'
  // else if there is an  error
  // dispatch an action FAVUNFAV_REJ  with an error equal  to the error of the
  // request
  return (dispatch) => {
    authenticatedRequest('POST', `/api/group/${id}/join`)
      .then(res => res.json())
      .then((resp) => {
        const data = resp.data;
        const isJoin = data.isJoined ? 'part of' : 'not part of';
        dispatch({
          type: FAVUNFAV_FUL,
          message: 'You are now ' + isJoin + ' this group',
          group: data,
        });
      })
      .catch((error) => {
        dispatch({
          type: FAVUNFAV_REJ,
          error,
        });
      });
  };
}

export function getDiscoverGroups() {
  return dispatch => authenticatedRequest('GET', '/api/newsfeed/discover-groups')
    .then(res => res.json())
    .then((resp) => {
      const groups = resp.data;
      dispatch({
        type: DISCOVERGROUPS_FUL,
        data: groups,
      });
    })
    .catch((error) => {
      dispatch({
        type: DISCOVERGROUPS_REJ,
        message: 'Error fetching groups',
        error,
      });
    });
}

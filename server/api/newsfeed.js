const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Group = require('../models/group');


module.exports = function (app) {
  router.use(isAuthenticated(app));

  router.get('/newsfeed', function (req, res) {
    Tweet.getNewsfeedTweets(req.user._id)
      .then((tweets) => {
        tweets = tweets.sort((a, b) => {
          a = a.created_at ? new Date(a.created_at) : new Date(0);
          b = b.created_at ? new Date(b.created_at) : new Date(0);
          return b - a;
        });
        let pTweets = tweets.map(t => t.getTweetInfo(req.user._id));
        return Promise.all(pTweets);
      })
      .then((tweets) => {
        res.json({ res: 'success', data: tweets });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
    // ENDSTUB
  });
  
  // get users that is not current user or a currently following user
  router.get('/newsfeed/discover-birds', function (req, res) {
    User.find({}).then((users) => {
      let result = [];
      users.map((user) => {
        if ((user._id.toString() !== req.user._id.toString()) && (user.followers.indexOf(req.user._id.toString()) === -1)) {
          result.push({ name: user.username, id: user._id });
        }
      });
      res.json({ res: 'success', data: result });
    }).catch((err) => {
      res.json({ res: 'failure', data: err });
    });
  });

    // get all groups
  router.get('/newsfeed/discover-groups', function (req, res) {
    Group.find({}).then((groups) => {
      let result = [];
        groups.map((group) => {
            result.push({ name: group.name, id: group._id });
        });
      res.json({ res: 'success', data: result });
    }).catch((err) => {
      res.json({ res: 'failure', data: err });
    });
  });

  return router;
};

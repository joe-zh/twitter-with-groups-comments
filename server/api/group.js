const router = require('express').Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const Tweet = require('../models/tweet');
const User = require('../models/user');
const Group = require('../models/group');

module.exports = function (app) {
  router.use(isAuthenticated(app));

  router.get('/group/:id?/info', function (req, res) {
    // TODO: This route will grab the information for a given profile. If no id is given,
    // look for the current user's profile. Use the getFormattedProfileById static method
    // in User. If there aren't any errors, return json in the format as follows:
    Group.getFormattedGroupById(req.params.id, req.user._id)
      .then((group) => {
        res.json({ res: 'success', data: group });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  router.get('/group/:id?/tweets', function (req, res) {
    let group = req.params.id;
    Tweet.getGroupTweets(group)
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
        res.json({ res: 'succcess', data: tweets });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  router.post('/group/:id/edit', function (req, res) {
    Group.updateGroupProfile(req.params.id, req.body.name, req.body.description)
      .then((okay) => {
        let { name, description } = okay;
        res.json({ res: 'success', data: { name, description }});
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  router.post('/group/:id/join', function (req, res) {
    Group.joinGroup(req.params.id, req.user._id)
      .then((okay) => {
        res.json({ res: 'success', data: okay });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  router.post('/group', function (req, res) {
    Group.createGroup(req.user.id, req.body.name, req.body.description)
      .then((group) => {
        res.json({ res: 'success', data: group });
      })
      .catch((err) => {
        res.json({ res: 'failure', data: err });
      });
  });

  return router;
};

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const tweetSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  responses: [{
    type: Schema.ObjectId,
    ref: 'Response',
  }],
  responseArray: [{authorName: String, authorId: Schema.ObjectId, authorPic: String,
                    content: String, responseId: Schema.ObjectId, respondingTo: Schema.ObjectId}],
  favorites: [{
    type: Schema.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: { createdAt: 'created_at' },
});

tweetSchema.methods.getTweetInfo = function (currentUserId) {
  return this.model('User').findOne({ _id: this.author })
    .then((res) => {
      let author = res;
      let obj = {
        authorName: author.username,
        authorId: author._id,
        authorPic: author.image,
        content: this.content,
        tweetId: this._id,
        numFavorites: this.favorites.length,
        responses: this.responses,
        responseArr: this.responseArray,
        isFavorited: (this.favorites.indexOf(currentUserId) > -1) ? true : false,
      };
      return obj;
    });
  // ENDSTUB
};

tweetSchema.statics.getTweetsForUser = function (userId) {

  /* returns tweet objects made by a user with id = userId
    * Return a promise!
    * */
  // STUB
  return this.find({ author: userId });
  // ENDSTUB
};

tweetSchema.statics.getNewsfeedTweets = function (userId) {
  // Find one user with _id matching userId. If there is, iterate through
  // the following array for the user and find all tweets made by that individual
  // at the end, return a single array of tweet objects (all same level ie must be
  // [t1, t2, t3 ... tn] but not [[t1], [t2,  t3] ... ].
  // Return a Promise!
  // STUB
  return this.model('User').findOne({ _id: userId })
    .then((user) => {
      let posts = user.following.map(tweeter => this.find({
        author: tweeter,
      }));
      return Promise.all(posts);
    })
    .then((posts) => {
      let flattened = [].concat.apply([], posts);
      return flattened;
    });
};

tweetSchema.statics.getGroupTweets = function (groupId) {
  // Find one user with _id matching userId. If there is, iterate through
  // the following array for the user and find all tweets made by that individual
  // at the end, return a single array of tweet objects (all same level ie must be
  // [t1, t2, t3 ... tn] but not [[t1], [t2,  t3] ... ].
  // Return a Promise!
  // STUB
  return this.model('Group').findOne({ _id: groupId })
    .then((group) => {
      let posts = group.users.map(tweeter => this.find({
        author: tweeter,
      }));
      return Promise.all(posts);
    })
    .then((posts) => {
      let flattened = [].concat.apply([], posts);
      return flattened;
    });
};

tweetSchema.statics.createTweet = function (currentUserId, content) {
  // given the current  user id and some content of a new tweet, create a new  tweet object and
  // save  it. Then once it saves, return the  result of the tweet.getTweetInfo(currentUserId).
  // General format of the method  should be
  // let newTweet = instantiate method
  // return newTweet.save().then((savedTweet) => { return the  tweet info })
  //  Return a Promise
  // STUB
  let newTweet = new this({
    author: currentUserId,
    content: content,
    favorites: [],
    responses: [],
  });
  return newTweet.save()
    .then(saved => saved.getTweetInfo(currentUserId));
  // ENDSTUB
};

tweetSchema.statics.favoriteTweet = function (currentUserId, tweetId) {
  // given a current user and a  tweet id, appropriately add/remove favorites on a given tweet.
  // On completion of the  save return the tweet info (via getTweetInfo), passing in the currentuser id
  // Return a Promise!
  // STUB
  return this.findOne({ _id: tweetId })
    .then((tweet) => {
      if (tweet.favorites.indexOf(currentUserId) > -1) {
        tweet.favorites.remove(currentUserId);
      } else {
        tweet.favorites.push(currentUserId);
      }
      return tweet.save();
    })
    .then(saved => saved.getTweetInfo(currentUserId));
  // ENDSTUB
};

tweetSchema.statics.respondToTweet = function (currentUserId, tweetId, content) {
  // given a current user and a  tweet id, appropriately add/remove favorites on a given tweet.
  // On completion of the  save return the tweet info (via getTweetInfo), passing in the currentuser id
  // Return a Promise!
  // STUB
  let tweet;  
  return this.findOne({ _id: tweetId })
    .then((t) => {
      tweet = t;
      return this.model('Response').createResponse(currentUserId, content, tweetId);
    })
    .then((res) => {
      tweet.responses.push(res.responseId);
      tweet.responseArray.push(res);
      return tweet.save();
    })
    .then(saved => saved.getTweetInfo(currentUserId));
};


module.exports = mongoose.model('Tweet', tweetSchema);

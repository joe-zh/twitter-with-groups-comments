const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const responseSchema = new Schema({
  author: {
    type: Schema.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: true,
  },
  respondingTo: {
    type: Schema.ObjectId,
    required: true,
    ref: 'Tweet',
  },
}, {
  timestamps: { createdAt: 'created_at' },
});


responseSchema.methods.getResponseInfo = function (currentUserId) {
  return this.model('User').findOne({ _id: this.author })
    .then((res) => {
      let author = res;
      let obj = {
        authorName: author.username,
        authorId: author._id,
        authorPic: author.image,
        content: this.content,
        responseId: this._id,
        respondingTo: this.respondingTo
      };
      return obj;
    });
};

responseSchema.statics.createResponse = function (currentUserId, content, tweetId) {
  let newResponse = new this({
    author: currentUserId,
    content: content,
    respondingTo: tweetId,
  });
  return newResponse.save()
    .then(saved => saved.getResponseInfo(currentUserId));
};

responseSchema.static.getResponseById = function (id, currentUserId) {
  return this.findOne({_id: id})
  .then((res) => res.getResponseInfo(currentUserId));
}

module.exports = mongoose.model('Response', responseSchema);

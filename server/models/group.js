const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const config = require('../config');

// TODO: User schema should have the following.
// A `username` of type string  that is unique and required
// A `name` of type string
// a `password` of type string t hat is required
// a `species` that is type string (will be the bird species
// an `image` of type  string
// an array `following` containing objects of type Schema.ObjectId
// an array of `followers containing objects of  type Schema.ObjectId
let groupSchema = new Schema({
  admin: { type: Schema.ObjectId, required: true },
  name: { type: String, required: true },
  description: { type: String },
  users: [{ type: Schema.ObjectId,}],
});


groupSchema.statics.createGroup = function (currentUserId, name, description) {
  let newUserGroup = new this({
    admin: currentUserId,
    name: name,
    description: description,
    users: []
  });
  return newUserGroup.save()
  .then(saved => saved.getFormattedGroupById(newUserGroup._id, currentUserId));
};

groupSchema.statics.getFormattedGroupById = function (groupId, currentUserId) {
  let group;
  // given an id and a current user id (corresponding to  the person looking at  the profile
  // return a group object with the following structure
  return this.findOne({ _id: groupId })
    .then((g) => {
      group = g;
      return this.model('User').findOne({ _id: g.admin });
    })
    .then((user) => {
      if (group) {
        return {
          admin: group.admin,
          adminName: user.name,
          name: group.name,
          description: group.description,
          users: group.users,
          isJoined: group.users.indexOf(currentUserId) > -1 ? true : false,
        };
      }
    });
};


groupSchema.statics.updateGroupProfile = function (id, name, description) {
  return this.findOne({ _id: id })
    .then((group) => {
      group.name = name;
      group.description = description;
      return group.save();
    });
};

groupSchema.statics.joinGroup = function (groupId, currentUserId) {
  let group;
  let joiningUser;
  let type;

  return this.findOne({ _id: groupId })
    .then((g) => {
      group = g;
      return this.model('User').findOne({ _id: currentUserId });
    })
    .then((user) => {
      joiningUser = user;
      if (group.users.indexOf(joiningUser._id) > -1) {
        group.users.remove(joiningUser);
      } else {
        group.users.push(joiningUser);
      }
      return group.save();
    })
    .then(res => this.getFormattedGroupById(group._id, currentUserId));
};

module.exports = mongoose.model('Group', groupSchema);

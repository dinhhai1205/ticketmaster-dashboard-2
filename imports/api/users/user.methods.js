import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";

/**
 * @name createUser
 * @description create new project
 * @param user {Object}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const createUser = new ValidatedMethod({
  name: "createUser",
  validate: new SimpleSchema({
    user: Object,
    "user.email": String,
    "user.firstName": String,
    "user.lastName": String,
    "user.avatar": { type: String, optional: true },
    "user.password": String,
    "user.confirmPassword": String,
    "user.roles": Array,
    "user.roles.$": String,
  }).validator(),
  run({ user }) {
    this.unblock();
    if (!Meteor.users.findOne(this.userId).isPermission({ manage: true })) {
      throw new Meteor.Error(500, "You do not have permission");
    }

    // Create User
    const userId = Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });

    // Handle upload avatar
    // if (avatarUser) {
    //   Meteor.users.update({ _id: userId }, { $set: { avatar: avatarUser } });
    // }

    if (!userId) {
      throw new Meteor.Error(500, "Can not create user");
    }

    // Add Role
    Roles.addUsersToRoles(userId, user.roles, Roles.GLOBAL_GROUP);

    return userId;
  },
});

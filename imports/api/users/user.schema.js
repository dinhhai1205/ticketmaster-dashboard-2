import SimpleSchema from "simpl-schema";
import CheckRoles from "../../lib/roles";
import { USER_ROLES } from "../../lib/enums";

const schema = new SimpleSchema({
  emails: {
    type: Array,
    optional: true,
  },
  "emails.$": {
    type: Object,
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },
  "emails.$.verified": {
    type: Boolean,
  },
  avatar: {
    type: String,
    optional: true,
  },
  firstName: {
    type: String,
    optional: true,
  },
  lastName: {
    type: String,
    optional: true,
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true,
  },
  createdAt: {
    type: Date,
  },
});

Meteor.users.attachSchema(schema);

Meteor.users.helpers({
  isAdmin() {
    return Roles.userIsInRole(this._id, USER_ROLES.ROOT_ADMIN);
  },
  isPermission(nest) {
    return new CheckRoles(this).check(nest);
  },
});

// Deny all client-side updates to user documents
// Meteor.users.deny({
//   insert() {
//     return true;
//   },
//   update() {
//     return true;
//   },
//   remove() {
//     return true;
//   },
// });

const Users = {
  schema,
};

export default Users;

import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Request from "./request.schema";

/**
 * @name createRequest
 * @description create new project
 * @param user {Object}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const createRequest = new ValidatedMethod({
  name: "createRequest",
  validate: new SimpleSchema().validator(),
  run() {
    Request.insert({
      tickets: [],
      approved: false,
      approvedDate: new Date(),
      createdAt: new Date(),
      createdBy: "hihi",
    });
  },
});

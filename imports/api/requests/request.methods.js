import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Request, { RequestSchema } from "./request.schema";

/**
 * @name createRequest
 * @description Create a Request
 * @param user {Object}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const createRequest = new ValidatedMethod({
  name: "createRequest",
  validate: RequestSchema.validator(),
  run({ tickets, approved = false, approvedDate, createdBy }) {
    this.unblock();

    return Request.insert({
      tickets,
      approved,
      approvedDate,
      createdBy,
    });
  },
});

/**
 * @name updateRequest
 * @description Update a Request
 * @param request {Object}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const updateRequest = new ValidatedMethod({
  name: "updateRequest",
  validate: new SimpleSchema({
    _id: String,
    tickets: { type: Array, optional: true },
    "tickets.$": { type: String, optional: true },
    approved: { type: Boolean, optional: true },
    approvedDate: { type: Date, optional: true },
    createdBy: { type: String, optional: true },
  }).validator(),
  run({ _id, tickets, approved, approvedDate, createdBy }) {
    this.unblock();

    Request.update(_id, {
      $set: {
        tickets,
        approved,
        approvedDate,
        createdBy,
        updatedDate: new Date(),
      },
    });

    return _id;
  },
});

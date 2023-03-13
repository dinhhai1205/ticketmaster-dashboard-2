import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Request = new Mongo.Collection("requests");

export const RequestSchema = new SimpleSchema({
  tickets: {
    type: Array,
    defaultValue: [],
  },
  "tickets.$": {
    type: String,
    optional: true,
  },
  approved: Boolean,
  approvedDate: {
    type: Date,
    optional: true,
    defaultValue: null,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    optional: true,
  },
  updatedAt: {
    type: Date,
    defaultValue: new Date(),
    optional: true,
  },
  deleted: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  createdBy: {
    type: String,
    defaultValue: null,
    optional: true,
  },
});

Request.attachSchema(RequestSchema);

export default Request;

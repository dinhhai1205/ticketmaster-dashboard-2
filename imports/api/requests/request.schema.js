import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Request = new Mongo.Collection("requests");

const Schema = {};

Schema.Request = new SimpleSchema({
  tickets: {
    type: Array,
    defaultValue: [],
  },
  "tickets.$": String,
  approved: Boolean,
  approvedDate: {
    type: Date,
    optional: true,
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
  createdBy: String,
});

Request.attachSchema(Schema.Request);

export default Request;

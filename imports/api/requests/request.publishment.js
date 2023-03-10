import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Request from "./request.schema";

Meteor.publish("requests", (options) => {
  check(options, Match.Maybe(Object));

  return Request.find({}, options?.fields);
});

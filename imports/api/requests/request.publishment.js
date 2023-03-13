import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Request from "./request.schema";

Meteor.publish("requests", (query = {}, options) => {
  check(query, Match.Maybe(Object));
  check(options, Match.Maybe(Object));

  return Request.find(query, options?.fields);
});

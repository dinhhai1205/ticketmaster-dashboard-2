import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Ticket from "./ticket.schema";

Meteor.publish("tickets", (options) => {
  check(options, Match.Maybe(Object));

  return Ticket.find({}, options?.fields);
});

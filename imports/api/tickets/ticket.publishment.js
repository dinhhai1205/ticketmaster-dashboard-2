import { Meteor } from "meteor/meteor";
import { check, Match } from "meteor/check";
import Ticket from "./ticket.schema";

Meteor.publish("tickets", (query = {}, options) => {
  check(query, Match.Maybe(Object));
  check(options, Match.Maybe(Object));

  return Ticket.find(query, options?.fields);
});

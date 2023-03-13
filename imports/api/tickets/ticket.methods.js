import { ValidatedMethod } from "meteor/mdg:validated-method";
import { Meteor } from "meteor/meteor";
import SimpleSchema from "simpl-schema";
import Ticket, { TicketSchema } from "../tickets/ticket.schema";

/**
 * @name createTicket
 * @description Create a ticket
 * @param ticket {Object}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const createTicket = new ValidatedMethod({
  name: "createTicket",
  validate: TicketSchema.validator(),
  run({
    paymentId,
    tabId,
    cost,
    info,
    quantity,
    section,
    row,
    seat,
    event,
    createdBy,
  }) {
    this.unblock();

    return Ticket.insert({
      paymentId,
      tabId,
      cost,
      info,
      quantity,
      section,
      row,
      seat,
      event,
      createdBy,
    });
  },
});

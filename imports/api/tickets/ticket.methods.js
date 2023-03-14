import { ValidatedMethod } from "meteor/mdg:validated-method";
import { check, Match } from "meteor/check";
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

    const existedTicket = Ticket.findOne({ paymentId, deleted: false });
    console.log("Existed", existedTicket?._id);
    if (!existedTicket) {
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
    }

    return null;
  },
});

/**
 * @name removeTicket
 * @description Create a ticket
 * @param id {String}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const removeTicket = new ValidatedMethod({
  name: "removeTicket",
  validate: ({ id, force }) => {
    check(id, String);
    check(force, Match.Maybe(Boolean));
  },
  run({ id, force }) {
    this.unblock();
    console.log("Remove", id);

    if (force) {
      return Ticket.remove(id);
    }

    Ticket.update(id, {
      $set: {
        deleted: true,
      },
    });
  },
});

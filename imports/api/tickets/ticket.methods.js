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
    approved = false,
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
        approved,
      });
    }

    return null;
  },
});

/**
 * @name updateTicket
 * @description Create a ticket
 * @param id {String}
 * @type {ValidatedMethod}
 * @return {String}
 */
export const updateTicket = new ValidatedMethod({
  name: "updateTicket",
  validate: TicketSchema.pick(
    "paymentId",
    "tabId",
    "cost",
    "info",
    "quantity",
    "section",
    "row",
    "seat",
    "event",
    "createdBy",
    "approved",
    "approvedDate"
  )
    .extend({
      _id: String,
    })
    .validator(),
  run({
    _id,
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
    approved,
    approvedDate,
  }) {
    this.unblock();

    Ticket.update(_id, {
      $set: {
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
        updatedDate: new Date(),
        approved,
        approvedDate: approvedDate || new Date(),
      },
    });
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

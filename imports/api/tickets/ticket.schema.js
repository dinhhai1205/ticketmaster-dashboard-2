import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Ticket = new Mongo.Collection("tickets");

export const TicketSchema = new SimpleSchema({
  paymentId: {
    type: String,
    optional: true,
  },
  tabId: {
    type: String,
    optional: true,
  },
  cost: Number,
  info: String,
  quantity: Number,
  section: Number,
  row: Number,
  seat: {
    type: Array,
    defaultValue: [],
  },
  "seat.$": String,
  event: Object,
  "event.name": String,
  "event.venue": String,
  "event.datetime": Date,
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
  createdBy: {
    type: String,
    defaultValue: null,
    optional: true,
  },
  deleted: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Ticket.attachSchema(TicketSchema);

export default Ticket;

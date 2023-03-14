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
  approved: {
    type: Boolean,
    optional: true,
  },
  approvedDate: {
    type: Date,
    optional: true,
  },
  cost: { type: String, optional: true },
  info: { type: String, optional: true },
  quantity: { type: Number, optional: true },
  section: { type: Number, optional: true },
  row: { type: Number, optional: true },
  seat: {
    type: Array,
    defaultValue: [],
    optional: true,
  },
  "seat.$": String,
  event: {
    type: Object,
    optional: true,
  },
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

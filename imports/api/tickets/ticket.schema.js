import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";

const Ticket = new Mongo.Collection("tickets");

const Schema = {};

Schema.Ticket = new SimpleSchema({
  paymentId: String,
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
  },
  createdBy: String,
});

Ticket.attachSchema(Schema.Ticket);

export default Ticket;

import React, { useCallback } from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Request from "../../../api/requests/request.schema";
import Ticket from "../../../api/tickets/ticket.schema";

const HomePage = () => {
  const requestLoading = useSubscribe("requests");
  const ticketLoading = useSubscribe("tickets");
  const requests = useFind(() => Request.find());
  const tickets = useFind(() => Ticket.find());

  const approveRequest = useCallback((_id) => {
    if (!_id) throw new Error("No ID");

    call("updateRequest", {
      _id,
      approved: true,
      approvedDate: new Date(),
    });
  }, []);

  if (requestLoading() || ticketLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div style={{ background: "#ececec" }}>
        <div>REQUESTS</div>
        {requests.map((item) => {
          return (
            <div
              style={{ border: "1px solid red", borderRadius: 5, padding: 20 }}
              key={item._id}
            >
              <div>ID: {item._id}</div>
              <div>Approved: {item.approved}</div>
              <div>Approved Date: {new Date(item.approvedDate).toString()}</div>
              <div>Date: {new Date(item.createdAt).toString()}</div>
              <div>Created by: {item.createdBy}</div>
              <button onClick={() => approveRequest(item._id)}>Approved</button>
            </div>
          );
        })}
      </div>

      <div style={{ background: "#ececec" }}>
        <div>TICKETS</div>
        {tickets.map(
          ({ _id, cost, info, event, quantity, row, section, seat }) => {
            return (
              <div
                style={{
                  border: "1px solid green",
                  borderRadius: 5,
                  padding: 20,
                }}
                key={_id}
              >
                <div>Ticket Id: {_id}</div>
                <div>Info: {info}</div>
                <div>Cost: ${cost}</div>
                <div>Quantity: ${quantity}</div>
                <div>Name: {event.name}</div>
                <div>Venue: {event.venue}</div>
                <div>Date: {new Date(event.datetime).toString()}</div>
                <div>Row: {row}</div>
                <div>Section: {section}</div>
                <div>Seats: {seat.join(", ")}</div>
              </div>
            );
          }
        )}
      </div>
      <button onClick={onClick}>Create</button>
    </div>
  );
};

export default HomePage;

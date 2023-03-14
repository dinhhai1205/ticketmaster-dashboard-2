import React, { useCallback, useMemo } from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Request from "../../../api/requests/request.schema";
import Ticket from "../../../api/tickets/ticket.schema";
import { call } from "../../../lib/meteor";
import { Collapse } from "antd";
const { Panel } = Collapse;
import 'antd/dist/reset.css';

const HomePage = () => {
  const requestLoading = useSubscribe("requests");
  const ticketLoading = useSubscribe("tickets");
  const requests = useFind(() => Request.find({ deleted: false }));
  const tickets = useFind(() => Ticket.find({ deleted: false }));

  const onClick = useCallback(() => {
    call("createTicket", {
      paymentId: Math.floor(Math.random() * 1000000).toString(),
      tabId: Math.floor(Math.random() * 1000000).toString(),
      cost: "250",
      info: "INFOOO",
      quantity: 10,
      section: 2,
      row: 10,
      seat: ["2", "3"],
      event: {
        name: "NAME",
        venue: "VENUE",
        datetime: new Date(),
      },
      createdBy: "3WyvHphcGB0igx1T9vekzTwIkNVyUF2z_y4CAq-bkkk",
    });
  }, []);

  const removeTicket = useCallback(() => {
    call("removeTicket", { id: _id });
  }, []);

  const approveTicket = useCallback((_id) => {
    if (!_id) throw new Error("No ID");

    call("updateTicket", {
      _id,
      approved: true,
      approvedDate: new Date(),
    });
  }, []);

  const ticketByUserId = useMemo(
    () =>
      tickets.reduce((acc, item) => {
        if (!acc[item.createdBy]) {
          acc[item.createdBy] = [];
        }

        acc[item.createdBy].push(item);

        return acc;
      }, {}),
    []
  );

  if (requestLoading() || ticketLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* <div style={{ background: "#ececec" }}>
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
      </div> */}

      <Collapse defaultActiveKey={["1"]}>
        {Object.keys(ticketByUserId).map((key) => {
          const ticketData = ticketByUserId[key];

          return (
            <Panel header={`UserId: ${key}`} key={key}>
              {ticketData.map(
                ({
                  _id,
                  tabId,
                  paymentId,
                  cost,
                  info,
                  event,
                  quantity,
                  row,
                  section,
                  seat,
                  createdBy,
                  approved,
                }) => {
                  return (
                    <Card
                      size="small"
                      title={`Ticket Id: ${_id} - ${paymentId} - ${tabId}}`}
                      key={_id}
                    >
                      <div>Info: {info}</div>
                      <div>Cost: ${cost}</div>
                      <div>Quantity: ${quantity}</div>
                      <div>Name: {event.name}</div>
                      <div>Venue: {event.venue}</div>
                      <div>Date: {new Date(event.datetime).toString()}</div>
                      <div>Row: {row}</div>
                      <div>Section: {section}</div>
                      <div>Seats: {seat.join(", ")}</div>
                      <div>Created by: {createdBy}</div>

                      <div>
                        <button
                          disabled={approved}
                          onClick={() => approveTicket(_id)}
                        >
                          Approve
                        </button>
                        <button onClick={() => removeTicket(_id)}>
                          Delete
                        </button>
                      </div>
                    </Card>
                  );
                }
              )}
            </Panel>
          );
        })}
      </Collapse>

      <button onClick={onClick}>Create Random Ticket</button>
    </div>
  );
};

export default HomePage;

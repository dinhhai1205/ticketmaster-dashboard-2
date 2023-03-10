import React from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Ticket from "../api/tickets/ticket.schema";

export const Info = () => {
  const isLoading = useSubscribe("links");
  const links = useFind(() => Ticket.find());

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Learn Meteor!</h2>
      <ul>
        {links.map((link) => (
          <li key={link._id}>
            <a href={link.url} target="_blank">
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

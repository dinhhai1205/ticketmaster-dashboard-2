import React, { useCallback } from "react";
import { useFind, useSubscribe } from "meteor/react-meteor-data";
import Request from "../../../api/requests/request.schema";

const HomePage = () => {
  const isLoading = useSubscribe("requests");
  const requests = useFind(() => Request.find());

  const onClick = useCallback(() => {
    Request.insertAsync({
      tickets: [],
      approved: false,
      approvedDate: new Date(),
      createdAt: new Date(),
      createdBy: "hihi",
    });
  }, []);

  if (isLoading()) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "red" }}>
      {requests.map((item) => (
        <div key={item._id}>{item._id}</div>
      ))}

      <button onClick={onClick}>Create</button>
    </div>
  );
};

export default HomePage;

import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../../Context/UserContext";
import axios from "axios";
import TraderData from "./TraderData/TraderData";

function TraderRequests() {
  const { baseUrl } = useContext(UserContext);
  const [isDone, setIsDone] = useState(false);
  const [userDeleted, setUserDeleted] = useState(null);
  const { data, isLoading, error } = useQuery("getTraderRequests", () =>
    axios.get(`${baseUrl}/user/usersForAdmin`)
  );
  if (isDone && userDeleted?.userName) {
    const index = data?.data?.users.indexOf(userDeleted);
    if (index !== -1) {
      data?.data?.users.splice(index, 1); // Removes 1 item at the found index
    }
  }

  return (
    <>
      {data?.data?.users?.length ? (
        <div className="p-5 flex flex-col items-center gap-4">
          {data.data.users.map((user) => (
            <TraderData
              user={user}
              setIsDone={setIsDone}
              setUserDeleted={setUserDeleted}
            />
          ))}
        </div>
      ) : (
        <div className="size-full flex items-center justify-center">
          <p className="p-5 text-lg font-medium bg-white rounded-lg">
            There is no request right now
          </p>
        </div>
      )}
    </>
  );
}

export default TraderRequests;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { FaAngleRight } from "react-icons/fa";

function TraderData({ user, setUserDeleted, setIsDone }) {
  const { baseUrl, token, setToken, setUserData } = useContext(UserContext);

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const navigate = useNavigate();

  const acceptAccount = async (id) => {
    console.log(id);

    setAcceptLoading(true);
    const { data } = await axios
      .patch(
        `${baseUrl}/user/${id}/accept`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Hamada__${token}`,
          },
        }
      )
      .catch((err) => {
        setAcceptLoading(false);

        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        }
      });
    if (data.message == "Done") {
      setUserDeleted(user);
      setIsDone(true);
      setAcceptLoading(false);
    }
  };
  const rejectAccount = async (id) => {
    console.log(id);

    setRejectLoading(true);
    const { data } = await axios
      .patch(
        `${baseUrl}/user/${id}/refused`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Hamada__${token}`,
          },
        }
      )
      .catch((err) => {
        setRejectLoading(false);
        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        }
      });
    if (data.message == "Done") {
      setUserDeleted(user);
      setIsDone(true);
      setRejectLoading(false);
      console.log(data);
    }
  };

  return (
    <div className="p-10 bg-white rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-10">
        <p className="text-textbody">
          <span className="font-medium text-black">Name:</span> {user.userName}
        </p>
        <p className="text-textbody">
          <span className="font-medium text-black">E_mail:</span> {user.email}
        </p>
        {user.phone ? (
          <p className="text-textbody">
            <span className="font-medium text-black">Phone:</span>{" "}
          </p>
        ) : (
          ""
        )}
      </div>
      <Link
        to={`/dashboard/traderDetails/${user._id}`}
        className="text-textbody my-2 flex items-center"
      >
        view details <FaAngleRight />
      </Link>
      <div className="flex items-center gap-4">
        {acceptLoading ? (
          <button
            disabled
            className="py-2 px-4 outline-none rounded-md bg-main"
          >
            <PulseLoader
              color="#fff"
              cssOverride={{}}
              loading
              margin={2}
              size={7}
              speedMultiplier={1}
            />
          </button>
        ) : (
          <button
            onClick={() => acceptAccount(user?._id)}
            className="py-2 px-4 outline-none rounded-md bg-main"
          >
            Accept
          </button>
        )}
        {rejectLoading ? (
          <button
            disabled
            className="py-2 px-4 outline-none rounded-md bg-profileColor"
          >
            <PulseLoader
              color="#000"
              cssOverride={{}}
              loading
              margin={2}
              size={7}
              speedMultiplier={1}
            />
          </button>
        ) : (
          <button
            onClick={() => rejectAccount(user._id)}
            className="py-2 px-4 outline-none rounded-md bg-profileColor"
          >
            Reject
          </button>
        )}
      </div>
    </div>
  );
}

export default TraderData;

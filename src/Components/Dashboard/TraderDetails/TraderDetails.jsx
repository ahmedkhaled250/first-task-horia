import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { PulseLoader } from "react-spinners";

function TraderDetails() {
  const [user, setUser] = useState(null);
  const { id } = useParams();
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
      setAcceptLoading(false);
      console.log(data);
      navigate("/dashboard/traderRequests");
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
      setRejectLoading(false);
      console.log(data);
      navigate("/dashboard/traderRequests");
    }
  };

  const getUser = async () => {
    const { data } = await axios.get(`${baseUrl}/user/${id}`);
    setUser(data.user);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold p-5 pb-0">Trader details</h2>
      <div className="grid grid-cols-4 gap-4 p-5 ">
        <div className="col-span-full lg:col-span-2">
          <label className="font-medium">User name</label>
          <div className="text-textbody p-2 w-full bg-white border-2 border-gray-300">
            {user?.userName}
          </div>
        </div>
        <div className="col-span-full lg:col-span-2">
          <label className="font-medium">Email</label>
          <div className="text-textbody p-2 w-full bg-white border-2 border-gray-300">
            {user?.email}
          </div>
        </div>
        {user?.address ? (
          <div className="col-span-full lg:col-span-2">
            <label className="font-medium">Address</label>
            <div className="text-textbody p-2 w-full bg-white border-2 border-gray-300">
              {user?.address}
            </div>
          </div>
        ) : (
          <div className="col-span-full lg:col-span-2 py-2"></div>
        )}
        {user?.phone ? (
          <div className="col-span-full lg:col-span-2">
            <label className="font-medium">Phone</label>
            <div className="text-textbody p-2 w-full bg-white border-2 border-gray-300">
              {user?.phone}
            </div>
          </div>
        ) : (
          <div className="col-span-full lg:col-span-2 py-2"></div>
        )}

        {user?.role == "Business" ? (
          <div className="col-span-full lg:col-span-2">
            <label className="font-medium">Commercial register</label>
            <img
              src={user?.commercialRegister.secure_url}
              className="w-full"
              alt={user?.userName}
            />
          </div>
        ) : (
          ""
        )}
        {user?.role == "Individual" ? (
          <div className="col-span-full lg:col-span-2">
            <label className="font-medium">Tax Card</label>
            <img
              src={user?.personalId.secure_url}
              className="w-full"
              alt={user?.userName}
            />
          </div>
        ) : (
          ""
        )}
        {user?.role == "Business" ? (
          <div className="col-span-full lg:col-span-2">
            <label className="font-medium">Tax Card</label>
            <img
              src={user?.taxCard.secure_url}
              className="w-full"
              alt={user?.userName}
            />
          </div>
        ) : (
          ""
        )}

        <div className="flex items-center gap-4 col-span-full">
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
    </div>
  );
}

export default TraderDetails;

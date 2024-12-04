import React, { useState, useRef, useEffect, useContext } from "react";
import ProfileImage from "../../../../assets/profile/profileImage.jpeg";
import { LuUpload } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import axios from "axios";
import { PulseLoader } from "react-spinners";
import Skeleton from "react-loading-skeleton";

// import unknownImage from "../../assets/unknown.png";
// import { UserContext } from "../../Context/userContext";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

function ProfilePhoto() {
  const { userData, avatar, baseUrl, setToken, token, profile, setUserData } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = async (event) => {
    setIsLoading(true);
    const image = event.target.files[0];
    if (image) {
      const file = new FormData();
      file.append("image", image);
      // setImageList(false);
      axios
        .patch(`${baseUrl}/user/profilePic`, file, {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Hamada__${token}`,
          },
        })
        .then(async (data) => {
          console.log("data", data);

          const result = await profile();
          setIsLoading(false);
          if (result.data?.user) {
            setUserData(result.data.user);
          }
          if (
            result?.response?.data?.errMass == "TokenExpiredError: jwt expired"
          ) {
            localStorage.clear();
            setToken(null);
            setUserData(null);
            navigate("/login");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log("catch", err);
          if (
            err?.response?.data?.errMass == "TokenExpiredError: jwt expired"
          ) {
            localStorage.clear();
            setToken(null);
            navigate("/login");
          }
          if (err?.response?.status == 400 || err?.response?.status == 409) {
            setIsLoading(false);
            // toast.error(err.response.data.errMass);
          }
        });
    }
  };

  return (
    <>
      {!userData?.image?.secure_url ? (
        <Skeleton className="w-full h-96 my-5 rounded-none" />
      ) : (
        <label
          className={`w-full ${
            isLoading ? "" : "cursor-pointer"
          } relative block`}
        >
          {isLoading ? (
            <div className="absolute top-0 left-0 w-full h-full text-white bg-black bg-opacity-70 z-50 flex items-center justify-center">
              <PulseLoader
                color="#fff"
                cssOverride={{}}
                loading
                margin={2}
                size={7}
                speedMultiplier={1}
              />
            </div>
          ) : (
            ""
          )}
          <div className="relative">
            <div className="flex items-center gap-2 justify-center absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-4">
              <LuUpload /> Upload Photo
            </div>
            <img
              className="my-5 w-full"
              src={userData.image?.secure_url || avatar}
              alt={userData.userName}
            />
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/*"
          />
        </label>
      )}
    </>
  );
}

export default ProfilePhoto;

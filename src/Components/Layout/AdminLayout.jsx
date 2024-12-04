import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import Sidebar from "../Dashboard/Sidebar/Sidebar";
import Navbar from "../Dashboard/Navbar/Navbar";

function AdminLayout() {
  const { profile, setUserData, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const getUserProfile = async () => {
    // setIsLoading(true);
    const result = await profile();

    if (result.data?.user) {
      // setIsLoading(false);
      setUserData(result.data.user);
    }
    if (result?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
      localStorage.clear();
      setToken(null);
      setUserData(null);
      navigate("/login");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <>
      <div className="overflow-hidden">
        <div className="flex">
          <ScrollToTop />
          <Sidebar />
          <div className="bg-product w-full">
            <Navbar />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLayout;

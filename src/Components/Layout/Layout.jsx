import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { UserContext } from "../../Context/UserContext";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

function Layout() {
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
      <div className="text-blackColor overflow-hidden">
        <ScrollToTop />
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;

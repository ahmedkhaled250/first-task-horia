import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { PulseLoader } from "react-spinners";
import ProfilePhoto from "./ProfilePhoto/ProfilePhoto";
import { UserContext } from "../../../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function ProfileData() {
  const { userData, setUserData, setToken, token, baseUrl, profile } =
    useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdatePasswordLoading, setIsUpdatePasswordLoading] = useState(false);
  const [isUpdateProfileLoading, setIsUpdateProfileLoading] = useState(false);
  const [errUpdatePassword, setErrUpdatePassword] = useState(null);
  const [errUpdateProfile, setErrUpdateProfile] = useState(null);
  // const [savedUserData, setSavedUserData] = useState(userData);
  const navigate = useNavigate();

  useEffect(() => {}, [userData]);

  const initialUpdateProfileValues = {
    userName: userData?.userName || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
    address: userData?.address || "",
  };
  const initialUpdatePasswordValues = {
    oldPassword: "",
    password: "",
    cPassword: "",
  };

  const validationUpdateProfileSchema = Yup.object({
    userName: Yup.string()
      .min(2, "the minlengt of user name  is 2")
      .max(20, "the maxlength of user name is 20"),
    email: Yup.string().matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "In-valid email"
    ),
    phone: Yup.string().matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "In-valid phone"
    ),
    address: Yup.string().min(3, "the minlengt of address is 3"),
  });

  const validationUpdatePasswordSchema = Yup.object({
    oldPassword: Yup.string()
      .min(8, "the minlengt of password is 8")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password has to contain uppercase letter and lowercase letter and number and special character "
      )
      .required("Password is required"),
    password: Yup.string()
      .min(8, "the minlengt of password is 8")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "password has to contain uppercase letter and lowercase letter and number and special character "
      )
      .required("Password is required"),
    cPassword: Yup.string()
      .oneOf(
        [Yup.ref("password")],
        "confirm password and password are not the same"
      )
      .required("confirm password is required"),
  });

  async function updateProfile(values) {
    setIsUpdateProfileLoading(true);

    if (!values.userName || values.userName == userData.userName) {
      delete values.userName;
    }
    if (!values.address || values.address == userData.address) {
      delete values.address;
    }
    if (!values.phone || values.phone == userData.phone) {
      delete values.phone;
    }
    if (!values.email || values.email == userData.email) {
      delete values.email;
    }

    if (!values.userName && !values.address && !values.phone && !values.email) {
      setIsUpdateProfileLoading(false);
    } else {
      const { data } = await axios
        .put(`${baseUrl}/user`, values, {
          headers: { authorization: `Hamada__${token}` },
        })
        .catch((err) => {
          setIsUpdateProfileLoading(false);
          if (
            err?.response?.data?.errMass == "TokenExpiredError: jwt expired"
          ) {
            localStorage.clear();
            setToken(null);
            setUserData(null);
            navigate("/login");
          } else { 
            setErrUpdateProfile(err.response.data.errMass);
          }
        });
      if (data.message == "Done") {
        setIsUpdateProfileLoading(false);
        if (values.email) {
          setUserData(null);
          localStorage.clear();
          setToken(null);
          navigate("/login");
        } else {
          const result = await profile();
          if (result.data?.user) {
            setUserData(result.data.user);
          }
        }
      }
    }
  }

  async function updatePassword(values) {
    setIsUpdatePasswordLoading(true);
    const { data } = await axios
      .patch(`${baseUrl}/user/updatePassword`, values, {
        headers: { authorization: `Hamada__${token}` },
      })
      .catch((err) => {
        setIsUpdatePasswordLoading(false);
        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        }
        setErrUpdatePassword(err.response.data.errMass);
      });
    if (data.message == "Done") {
      setIsUpdatePasswordLoading(false);
      setUserData(null);
      localStorage.clear();
      setToken(null);
      navigate("/login");
    }
  }

  const formikUpdateProfile = useFormik({
    initialValues: initialUpdateProfileValues,
    validationSchema: validationUpdateProfileSchema,
    onSubmit: updateProfile,
  });

  const formikUpdatePassword = useFormik({
    initialValues: initialUpdatePasswordValues,
    validationSchema: validationUpdatePasswordSchema,
    onSubmit: updatePassword,
  });

  return (
    <div className="">
      <h3 className="text-black font-semibold text-lg lg:text-xl">
        Account settings
      </h3>

      <div className="flex flex-col sm:flex-row gap-5 lg:gap-10 items-center">
        <div className="w-full md:w-2/3 lg:w-1/3">
          <ProfilePhoto />
        </div>
        <div className="w-full lg:w-2/3">
          <form
            className={`text-black flex flex-col w-full`}
            onSubmit={formikUpdateProfile.handleSubmit}
          >
            <div className="w-full">
              <label
                htmlFor="userName"
                className="font-medium text-sm md:text-base"
              >
                User Name
              </label>
              <input
                type="text"
                id="userName"
                name="userName"
                onBlur={formikUpdateProfile.handleBlur}
                onChange={formikUpdateProfile.handleChange}
                value={formikUpdateProfile.values.userName}
                placeholder="User Name"
                className={`mt-1  ${
                  formikUpdateProfile.errors.userName &&
                  formikUpdateProfile.touched.userName
                    ? ""
                    : "mb-3"
                } bg-white font-medium outline-none border-2 py-2 px-4 w-full rounded-sm`}
              />
              {formikUpdateProfile.errors.userName &&
              formikUpdateProfile.touched.userName ? (
                <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                  {formikUpdateProfile.errors.userName}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="email"
                className="font-medium text-sm md:text-base"
              >
                E-mail Address
              </label>
              <input
                type="email"
                placeholder="E-mail Address"
                id="email"
                name="email"
                onBlur={formikUpdateProfile.handleBlur}
                onChange={formikUpdateProfile.handleChange}
                value={formikUpdateProfile.values.email}
                className={`mt-1 ${
                  formikUpdateProfile.errors.email &&
                  formikUpdateProfile.touched.email
                    ? ""
                    : "mb-3"
                } bg-white font-medium outline-none border-2 py-2 px-4  w-full rounded-sm`}
              />
              {formikUpdateProfile.errors.email &&
              formikUpdateProfile.touched.email ? (
                <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                  {formikUpdateProfile.errors.email}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="phone"
                className="font-medium text-sm md:text-base"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onBlur={formikUpdateProfile.handleBlur}
                onChange={formikUpdateProfile.handleChange}
                value={formikUpdateProfile.values.phone}
                placeholder="+1 (555) 000-0000"
                className={`mt-1  ${
                  formikUpdateProfile.errors.userName &&
                  formikUpdateProfile.touched.userName
                    ? ""
                    : "mb-3"
                } bg-white font-medium outline-none border-2 py-2 px-4 w-full rounded-sm`}
              />
              {formikUpdateProfile.errors.phone &&
              formikUpdateProfile.touched.phone ? (
                <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                  {formikUpdateProfile.errors.phone}
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="w-full">
              <label
                htmlFor="address"
                className="font-medium text-sm md:text-base"
              >
                Address
              </label>
              <input
                className={`mt-1 ${
                  formikUpdateProfile.errors.address &&
                  formikUpdateProfile.touched.address
                    ? ""
                    : "mb-3"
                } bg-white font-medium outline-none border-2 py-2 px-4  w-full rounded-sm`}
                id="address"
                name="address"
                type="text"
                onBlur={formikUpdateProfile.handleBlur}
                onChange={formikUpdateProfile.handleChange}
                value={formikUpdateProfile.values.address}
                placeholder="Address"
              />
              {formikUpdateProfile.errors.address &&
              formikUpdateProfile.touched.address ? (
                <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                  {formikUpdateProfile.errors.address}
                </div>
              ) : (
                ""
              )}
            </div>

            {errUpdateProfile ? (
              <div
                className={`${
                  formikUpdateProfile.isValid ? "" : "mb-2"
                } rounded-md text-red-400 text-lg font-medium px-3 w-full`}
              >
                {errUpdateProfile}
              </div>
            ) : (
              ""
            )}
            {isUpdateProfileLoading ? (
              <button
                disabled
                className={`w-full md:w-fit mr-auto text-white focus:outline-none focus:border-0 font-medium bg-main rounded-md  py-2 px-4`}
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
                disabled={!formikUpdateProfile.isValid}
                type="submit"
                className={`w-full md:w-fit mr-auto focus:outline-none focus:border-0 text-white font-medium bg-main rounded-md ${
                  formikUpdateProfile.isValid && formikUpdateProfile.dirty
                    ? "hover:bg-[#ffb13b]"
                    : ""
                }  duration-300 py-2 px-4`}
              >
                Save changes
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="w-full lg:w-2/3 mt-5">
        <form
          className={`text-black flex flex-col w-full`}
          onSubmit={formikUpdatePassword.handleSubmit}
        >
          <div className="w-full">
            <label
              htmlFor="oldPassword"
              className="font-medium text-sm md:text-base"
            >
              Current Password
            </label>
            <input
              className={`mt-1 ${
                formikUpdatePassword.errors.oldPassword &&
                formikUpdatePassword.touched.oldPassword
                  ? ""
                  : "mb-3"
              } bg-white font-medium outline-none border-2 py-2 px-4 w-full rounded-sm`}
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Current Password"
              onBlur={formikUpdatePassword.handleBlur}
              onChange={formikUpdatePassword.handleChange}
              value={formikUpdatePassword.values.oldPassword}
            />
            {formikUpdatePassword.errors.oldPassword &&
            formikUpdatePassword.touched.oldPassword ? (
              <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                {formikUpdatePassword.errors.oldPassword}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="font-medium text-sm md:text-base"
            >
              Password
            </label>
            <input
              className={`mt-1 ${
                formikUpdatePassword.errors.password &&
                formikUpdatePassword.touched.password
                  ? ""
                  : "mb-3"
              } bg-white font-medium outline-none border-2 py-2 px-4 w-full rounded-sm`}
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              onBlur={formikUpdatePassword.handleBlur}
              onChange={formikUpdatePassword.handleChange}
              value={formikUpdatePassword.values.password}
            />
            {formikUpdatePassword.errors.password &&
            formikUpdatePassword.touched.password ? (
              <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                {formikUpdatePassword.errors.password}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="cPassword"
              className="font-medium text-sm md:text-base"
            >
              Confirm password
            </label>
            <input
              className={`mt-1 ${
                formikUpdatePassword.errors.cPassword &&
                formikUpdatePassword.touched.cPassword
                  ? ""
                  : "mb-3"
              } bg-white font-medium outline-none border-2 py-2 px-4 w-full rounded-sm`}
              id="cPassword"
              name="cPassword"
              type="password"
              placeholder="Confirm password"
              onBlur={formikUpdatePassword.handleBlur}
              onChange={formikUpdatePassword.handleChange}
              value={formikUpdatePassword.values.cPassword}
            />
            {formikUpdatePassword.errors.cPassword &&
            formikUpdatePassword.touched.cPassword ? (
              <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                {formikUpdatePassword.errors.cPassword}
              </div>
            ) : (
              ""
            )}
          </div>

          {errUpdatePassword ? (
            <div
              className={`${
                formikUpdateProfile.isValid ? "" : "mb-2"
              } rounded-md text-red-400 text-lg font-medium px-3 w-full`}
            >
              {errUpdatePassword}
            </div>
          ) : (
            ""
          )}
          {isUpdatePasswordLoading ? (
            <button
              disabled
              className={`w-full md:w-fit mr-auto text-white focus:outline-none focus:border-0 font-medium bg-main rounded-md  py-2 px-4`}
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
              disabled={
                !(formikUpdatePassword.isValid && formikUpdatePassword.dirty)
              }
              type="submit"
              className={`w-full md:w-fit mr-auto  focus:outline-none focus:border-0 text-white font-medium bg-main rounded-md ${
                formikUpdatePassword.isValid && formikUpdatePassword.dirty
                  ? "hover:bg-[#ffb13b]"
                  : ""
              }  duration-300 py-2 px-4`}
            >
              Change Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileData;

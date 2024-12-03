import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import imageForms from "../../assets/imageForms.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
function CustomerRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
const { baseUrl } = useContext(UserContext);


  const initialValues = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    address: "",
    role: "Customer",
  };

  const validationSchema = Yup.object({
    userName: Yup.string()
      .required("User name is required")
      .min(2, "the minlengt of user name  is 2")
      .max(20, "the maxlength of user name is 20"),
    email: Yup.string()
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "In-valid email"
      )
      .required("email is required"),
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
    phone: Yup.string().matches(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "In-valid phone"
    ),
    address: Yup.string().min(3, "the minlengt of address is 3"),
  });

  async function register(values) {
    setIsLoading(true);
    if (!values.address) delete values.address;
    if (!values.phone) delete values.phone;
    const { data } = await axios
      .post(`${baseUrl}/auth/signup`, values)
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.errMass);
      });

    if (data.message == "Done") {
      setIsLoading(false);
      setErr(null);
      navigate("/login");
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });
  return (
    <>
      <Header
        header="join us as Acount Individual"
        nameComponent="Price plans and subscriptions"
      />
      <section className="">
        <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
          {/* Left Side (Image) */}
          <div className="hidden lg:block lg:col-span-4">
            <img src={imageForms} alt="imageForms" className="h-full" />
          </div>

          {/* Right Side (Form) */}
          <div className="col-span-12 lg:col-span-8 gap-5 flex flex-col justify-center py-10 lg:px-20 lg:py-5 ">
            <h3 className="text-xl font-bold mb-3 text-main text-center">
              Join
            </h3>
            <form
              className={`text-socend flex flex-col w-full`}
              onSubmit={formik.handleSubmit}
            >
              <div className="flex gap-4">
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.userName}
                    placeholder="User Name"
                    className={`mt-1  ${
                      formik.errors.userName && formik.touched.userName
                        ? ""
                        : "mb-3"
                    } bg-white font-medium outline-none shadow-2xl py-2 px-4 w-full rounded-md`}
                  />
                  {formik.errors.userName && formik.touched.userName ? (
                    <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                      {formik.errors.userName}
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.phone}
                    placeholder="+1 (555) 000-0000"
                    className={`mt-1  ${
                      formik.errors.userName && formik.touched.userName
                        ? ""
                        : "mb-3"
                    } bg-white font-medium outline-none shadow-2xl py-2 px-4 w-full rounded-md`}
                  />
                  {formik.errors.phone && formik.touched.phone ? (
                    <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                      {formik.errors.phone}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
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
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={`mt-1 ${
                    formik.errors.email && formik.touched.email ? "" : "mb-3"
                  } bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.email}
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
                    formik.errors.password && formik.touched.password
                      ? ""
                      : "mb-3"
                  } bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                  id="password"
                  name="password"
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password && formik.touched.password ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.password}
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
                    formik.errors.cPassword && formik.touched.cPassword
                      ? ""
                      : "mb-3"
                  } bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                  id="cPassword"
                  name="cPassword"
                  type="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.cPassword}
                />
                {formik.errors.cPassword && formik.touched.cPassword ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.cPassword}
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
                    formik.errors.address && formik.touched.address
                      ? ""
                      : "mb-3"
                  } bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                  id="address"
                  name="address"
                  type="text"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  placeholder="Address"
                />
                {formik.errors.address && formik.touched.address ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.address}
                  </div>
                ) : (
                  ""
                )}
              </div>

              {err ? (
                <div
                  className={`${
                    formik.isValid ? "" : "mb-2"
                  } rounded-md text-red-400 text-lg font-medium px-3 w-full`}
                >
                  {err}
                </div>
              ) : (
                ""
              )}

              {isLoading ? (
                <button
                  disabled
                  className={`w-full md:w-1/2 mr-auto text-white font-medium bg-main rounded-md  py-2 px-4`}
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
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className={`w-full md:w-1/2 mr-auto text-white font-medium bg-main rounded-md ${
                    formik.isValid && formik.dirty ? "hover:bg-[#ffb13b]" : ""
                  }  duration-300 py-2 px-4`}
                >
                  join now
                </button>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default CustomerRegister;

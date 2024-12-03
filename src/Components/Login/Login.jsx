import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import imageForms from "../../assets/imageForms.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";
function Login() {
    const { setToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
const { baseUrl } = useContext(UserContext);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
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
  });

  const login = async (values) => {
    setIsLoading(true);
    const { data } = await axios
      .post(`${baseUrl}/auth/signin`, values)
      .catch((err) => {
        setIsLoading(false);
        setErr(err.response.data.errMass);
      });
    if (data.message == "Done") {
      setIsLoading(false);
      setErr(null);
      localStorage.setItem("Token", data.token);
      setToken(data.token);
      if (data.role == "Admin") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: login,
  });
  return (
    <>
      <Header header="Login" nameComponent="Login" />
      <section className="">
        <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
          {/* Left Side (Image) */}
          <div className="hidden lg:block lg:col-span-4">
            <img src={imageForms} alt="imageForms" className="h-full" />
          </div>

          {/* Right Side (Form) */}
          <div className="col-span-12 lg:col-span-8 gap-8 flex flex-col justify-center py-10 lg:px-20 lg:py-5 ">
            <h3 className="text-xl font-bold mb-3 text-main text-center">
              Login
            </h3>
            <form
              className={`text-socend flex flex-col gap-8 w-full`}
              onSubmit={formik.handleSubmit}
            >
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
                  className={`mt-2 mb-4 bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                />
                {formik.errors.email && formik.touched.email ? (
                  <div className="rounded-md text-red-400 text-lg font-medium px-3 w-full">
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
                  className={`mt-2 mb-4 bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
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

export default Login;

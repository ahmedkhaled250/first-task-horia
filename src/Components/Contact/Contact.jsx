import React, { useState } from "react";
import Header from "../Header/Header";
import imageForms from "../../assets/imageForms.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const initialValues = {
    userName: "",
    email: "",
    message: "",
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
    message: Yup.string()
      .required("Message is required")
      .min(2, "the minlengt of user name  is 2"),
  });
  async function register(values) {
    console.log(values);

    // const { data } = await axios
    //   .post("https://e-commerce-back-one.vercel.app/auth/signup", values)
    //   .catch((err) => {
    //     setIsLoading(false);
    //     setErr(err.response.data.errMass);
    //   });
    // if (data.message == "Done") {
    //   setIsLoading(false);
    //   setErr(null);
    //   navigate("/login");
    // }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });
  return (
    <>
      <Header header="Contact US" nameComponent="Contact US" />
      <section className="">
        <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
          {/* Left Side (Image) */}
          <div className="hidden lg:block lg:col-span-4">
            <img src={imageForms} alt="imageForms" className="w-full" />
          </div>

          {/* Right Side (Form) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-center py-10 lg:px-20 lg:py-2">
            <h3 className="text-xl font-bold mb-3 text-main text-center">
              Join
            </h3>
            <form
              className={`text-socend flex flex-col ${
                formik.isValid ? "gap-5" : "gap-1"
              }  w-full`}
              onSubmit={formik.handleSubmit}
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
                  htmlFor="message"
                  className="font-medium text-sm md:text-base"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.message}
                  className={`resize-none mt-1 ${
                    err || (formik.errors.message && formik.touched.message)
                      ? ""
                      : "mb-3"
                  } bg-white font-medium outline-none shadow-2xl py-2 px-4  w-full rounded-md scrollbar-thin scrollbar-webkit`}
                ></textarea>
                {formik.errors.message && formik.touched.message ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.message}
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
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className={`w-full md:w-1/2 mr-auto text-white font-medium bg-main rounded-md ${
                  formik.isValid && formik.dirty ? "hover:bg-[#ffb13b]" : ""
                }  duration-300 py-2 px-4`}
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Contact;

import React, { useContext, useState } from "react";
import Header from "../Header/Header";
import imageForms from "../../assets/imageForms.jpeg";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BsCloudUpload } from "react-icons/bs";
import PreviewImage from "../PreviewImage/PreviewImage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { UserContext } from "../../Context/UserContext";

function BusinessRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
const {baseUrl} = useContext(UserContext)
  const navigate = useNavigate();

  const initialValues = {
    userName: "",
    email: "",
    password: "",
    cPassword: "",
    phone: "",
    address: "",
    commercialRegister: {},
    taxCard: {},
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
    commercialRegister: Yup.mixed()
      .required("Commercial register image is required")
      .test(
        "FILE_SIZE",
        "Commercial register image is too big",
        (value) => value && value.size < 1024 * 1024
      )
      .test(
        "FILE_TYPE",
        "In-valid image",
        (value) => value && ["image/png", "image/jpeg"].includes(value.type)
      ),
    taxCard: Yup.mixed()
      .required("Commercial register image is required")
      .test(
        "FILE_SIZE",
        "Commercial register image is too big",
        (value) => value && value.size < 1024 * 1024
      )
      .test(
        "FILE_TYPE",
        "In-valid image",
        (value) => value && ["image/png", "image/jpeg"].includes(value.type)
      ),
  });

  async function register(values) {
    setIsLoading(true);
    const {
      userName,
      email,
      password,
      cPassword,
      address,
      phone,
      commercialRegister,
      taxCard,
    } = values;
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("cPassword", cPassword);
    if (address) {
      formData.append("address", address);
    }
    if (phone) {
      formData.append("phone", phone);
    }
    formData.append("commercialRegister", commercialRegister);
    formData.append("taxCard", taxCard);
    formData.append("role", "Business");

    const { data } = await axios
      .post(`${baseUrl}/auth/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("commercialRegister", file);
  };
  const handleTaxCardChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("taxCard", file);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: register,
  });
  return (
    <>
      <Header
        header="join us as Business "
        nameComponent="Price plans and subscriptions"
      />
      <section className="">
        <div className="grid grid-cols-12 px-5 sm:px-10 lg:px-0">
          {/* Left Side (Image) */}
          <div className="hidden lg:block lg:col-span-4">
            <img src={imageForms} alt="imageForms" className="h-full" />
          </div>

          {/* Right Side (Form) */}
          <div className="col-span-12 lg:col-span-8 gap-5 flex flex-col justify-center py-10 lg:px-20 lg:py-5">
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

              <div className="w-full">
                <label
                  htmlFor="commercialRegister"
                  className="font-medium text-sm md:text-base"
                >
                  Commercial register
                </label>
                <input
                  className="hidden"
                  id="commercialRegister"
                  name="commercialRegister"
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                />

                <label
                  className={`mt-1 ${
                    formik.errors.commercialRegister &&
                    formik.touched.commercialRegister
                      ? ""
                      : "mb-3"
                  } bg-white  font-medium shadow-2xl cursor-pointer pt-2 pb-10 px-4 flex items-center gap-3 w-full rounded-md`}
                  htmlFor="commercialRegister"
                >
                  attach a file <BsCloudUpload />
                  {formik.values.commercialRegister?.name && (
                    <div className="w-10">
                      <PreviewImage file={formik.values.commercialRegister} />
                    </div>
                  )}
                </label>

                {formik.errors.commercialRegister &&
                formik.touched.commercialRegister ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.commercialRegister}
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="w-full">
                <label
                  htmlFor="taxCard"
                  className="font-medium text-sm md:text-base"
                >
                  Tax card
                </label>

                <input
                  className="hidden"
                  id="taxCard"
                  name="taxCard"
                  type="file"
                  onChange={handleTaxCardChange}
                  accept="image/*"
                />

                <label
                  className={`mt-1 ${
                    formik.errors.taxCard && formik.touched.taxCard
                      ? ""
                      : "mb-3"
                  } bg-white  font-medium shadow-2xl cursor-pointer pt-2 pb-10 px-4 flex items-center gap-3 w-full rounded-md`}
                  htmlFor="taxCard"
                >
                  attach a file <BsCloudUpload />
                  {formik.values.taxCard?.name && (
                    <div className=" w-10">
                      <PreviewImage file={formik.values.taxCard} />
                    </div>
                  )}
                </label>

                {formik.errors.taxCard && formik.touched.taxCard ? (
                  <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
                    {formik.errors.taxCard}
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

export default BusinessRegister;

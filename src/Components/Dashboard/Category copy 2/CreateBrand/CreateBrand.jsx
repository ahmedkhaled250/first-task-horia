import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../../../Context/UserContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
function CreateBrand() {
  const { baseUrl, setUserData, setToken, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    arName: "",
    enName: "",
  };

  const validationSchema = Yup.object({
    arName: Yup.string()
      .matches(
        /^[\u0621-\u064A0-9 ]+$/,
        "You have to use just Arabic letters and numbers"
      )
      .required("User name is required")
      .min(2, "the minlengt of user name  is 2")
      .max(50, "the maxlength of user name is 20"),
    enName: Yup.string()
      .matches(
        /^[A-Za-z0-9 ]+$/,
        "You have to use just English letters and numbers"
      )
      .required("User name is required")
      .min(2, "the minlengt of user name  is 2")
      .max(50, "the maxlength of user name is 20"),
  });

  async function addBrand(values) {
    setIsLoading(true);
    console.log(values);
    try {
      const { data } = await axios.post(`${baseUrl}/brand`, values, {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
          authorization: `Hamada__${token}`,
        },
      });

      if (data.message === "Done") {
        setIsLoading(false);
        setErr(null);
      } else {
        setIsLoading(false);
        setErr(data.errMass);
      }
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.data?.errMass === "TokenExpiredError: jwt expired") {
        localStorage.clear();
        setToken(null);
        setUserData(null);
        navigate("/login");
      } else {
        console.log(err.response.data);
        setErr(err.response.data.errMass);
      }
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addBrand,
  });

  return (
    <div className="size-full">
      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col w-2/3 mx-auto mt-14 `}
      >
        <h3 className="mb-3 text-2xl font-bold">Create brand</h3>

        <div className="w-full">
          <label className="font-medium text-black" htmlFor="arName">
            Name in Arabic
          </label>
          <input
            type="text"
            name="arName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.arName}
            id="arName"
            className={`${
              formik.errors.arName && formik.touched.arName ? "" : "mb-2"
            } w-full text-lg mt-1 outline-none border-2 border-gray-300 focus:border-main py-1 px-2`}
            placeholder="Name in Arabic"
          />
          {formik.errors.arName && formik.touched.arName ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.arName}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="w-full">
          <label className="font-medium text-black" htmlFor="enName">
            Name in English
          </label>
          <input
            type="text"
            name="enName"
            id="enName"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.enName}
            className={`${
              formik.errors.enName && formik.touched.enName ? "" : "mb-2"
            } w-full text-lg mt-1 outline-none border-2 border-gray-300 focus:border-main py-1 px-2`}
            placeholder="Name in English"
          />
          {formik.errors.enName && formik.touched.enName ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.enName}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="w-full">
          {err ? (
            <div
              className={` rounded-md mb-2 text-red-400 text-lg font-medium px-3 w-full`}
            >
              {err}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="w-full">
          {isLoading ? (
            <button
              disabled
              className="py-2 px-4 outline-none bg-main text-white rounded-md"
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
              type="submit"
              className="py-2 px-4 outline-none bg-main text-white rounded-md"
            >
              Create brand
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateBrand;

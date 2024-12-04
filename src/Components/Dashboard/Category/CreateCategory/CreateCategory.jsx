import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../../../Context/UserContext";
import PreviewImage from "../../../PreviewImage/PreviewImage";
import { PulseLoader } from "react-spinners";
import { BsCloudUpload } from "react-icons/bs";
import axios from "axios";
function CreateCategory() {
  const { baseUrl, setUserData, setToken, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const initialValues = {
    arName: "",
    enName: "",
    image: null,
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

    image: Yup.mixed()
      .required("Main image is required")
      .test(
        "FILE_SIZE",
        "Main image is too big",
        (value) => value && value.size < 1024 * 1024
      )
      .test(
        "FILE_TYPE",
        "In-valid image",
        (value) => value && ["image/png", "image/jpeg"].includes(value.type)
      ),
  });

  async function addCategory(values) {
    setIsLoading(true);
    const { arName, enName, image } = values;

    if (!image) {
      setIsLoading(false);
      return 0;
    }

    const formData = new FormData();
    formData.append("arName", arName);
    formData.append("enName", enName);
    formData.append("image", image);

    const { data } = await axios
      .post(`${baseUrl}/category`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Hamada__${token}`,
        },
      })
      .catch((err) => {
        setIsLoading(false);

        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        } else {
          setErr(err.response.data.errMass);
        }
      });
    if (data.message == "Done") {
      setIsLoading(false);
      setErr(null);
    }
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addCategory,
  });
  return (
    <div className="size-full">
      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col w-2/3 mx-auto mt-14 `}
      >
        <h3 className="mb-3 text-2xl font-bold">Create category</h3>
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
          <label htmlFor="image" className="font-medium text-sm md:text-base">
            Image
          </label>
          <input
            className="hidden"
            id="image"
            name="image"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />

          <label
            className={`mt-1 ${
              formik.errors.mainImage && formik.touched.image ? "" : "mb-2"
            } bg-white  font-medium border-2 border-gray-300 focus:border-main cursor-pointer pt-2 pb-10 px-4 flex items-center gap-3 w-full`}
            htmlFor="image"
          >
            attach a file <BsCloudUpload />
            {formik.values.image?.name && (
              <div className="w-8">
                <PreviewImage file={formik.values.image} />
              </div>
            )}
          </label>

          {formik.errors.image && formik.touched.image ? (
            <div className=" mb-1 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.image}
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
              Create category
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateCategory;

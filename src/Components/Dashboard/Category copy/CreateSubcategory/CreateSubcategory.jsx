import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../../../../Context/UserContext";
import PreviewImage from "../../../PreviewImage/PreviewImage";
import { PulseLoader } from "react-spinners";
import { BsCloudUpload } from "react-icons/bs";
import axios from "axios";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
function CreateSubcategory() {
  const { baseUrl, setUserData, setToken, token } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(null);
  const [isOpenedCategory, setIsOpenedCategory] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!categoryValue?.categoryId) {
      setCategoryError("You've to choose a specific category");
    }
  };

  const getAllCategories = async () => {
    setCategoriesLoading(true);
    const { data } = await axios.get(`${baseUrl}/category?fields=enName`);
    console.log(data.categories);
    setCategories(data.categories);
    setCategoriesLoading(false);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

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

const addSubcategory = async (values) => {
  setIsLoading(true);

  // Check if there's a category selected
  if (!categoryValue?.categoryId) {
    setCategoryError("You've to choose a specific category");
    setIsLoading(false);
    return;
  }

  console.log("Form data to be submitted:", values);

  try {
    const { data } = await axios.post(
      `${baseUrl}/category/${categoryValue.categoryId}/subcategory`,
      values,
      {
        headers: {
          "Content-Type": "application/json", // Ensure correct content type
          authorization: `Hamada__${token}`,
        },
      }
    );

    if (data.message === "Done") {
      setIsLoading(false);
      setErr(null);
      // Optionally redirect after successful submission
      // navigate("/some-page");
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
};

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addSubcategory,
  });

  return (
    <div className="size-full">
      <form
        onSubmit={formik.handleSubmit}
        className={`flex flex-col w-2/3 mx-auto mt-14 `}
      >
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

        <div className="col-span-full lg:col-span-4">
          <label htmlFor="">Choose category</label>
          <label
            onClick={() => setIsOpenedCategory(!isOpenedCategory)}
            htmlFor="category"
            className={`p-2 mt-1 mb-2 pr-[15%] block text-lg bg-white select-none w-full border-2 outline-none  ${
              isOpenedCategory ? "border-main" : "border-gray-300 "
            }  duration-300 relative ${
              categoryValue?.categoryId ? "text-black" : "text-gray-400"
            } text-start `}
          >
            {!categoryValue?.categoryId ? "Category" : categoryValue.name}
            {isOpenedCategory ? (
              <AiOutlineCaretUp className="text-lg absolute top-1/2 text-main -translate-y-1/2 right-[5%]" />
            ) : (
              <AiOutlineCaretDown
                className={`text-lg absolute top-1/2 text-black -translate-y-1/2 right-[5%]`}
              />
            )}

            <div
              className={`${
                isOpenedCategory ? "block" : "hidden"
              } absolute max-h-[20vh] p-2  overflow-y-auto scrollbar-thin scrollbar-webkit flex gap-1 flex-col border-2 bg-white left-0 top-full right-0 border-main text-center`}
            >
              {categoriesLoading ? (
                <Skeleton className="h-7 w-full rounded-md" count={3} />
              ) : (
                categories.map((category) => (
                  <div
                    onClick={() => {
                      setCategoryValue({
                        categoryId: category._id,
                        name: category.enName,
                      });
                      setCategoryError(null);
                    }}
                    className="py-1 rounded-md cursor-pointer text-main  hover:text-white hover:bg-main font-medium duration-300"
                  >
                    {category.enName}
                  </div>
                ))
              )}
            </div>
          </label>

          {categoryError ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {categoryError}
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
              onClick={() => handleSubmit()}
              type="submit"
              className="py-2 px-4 outline-none bg-main text-white rounded-md"
            >
              Create subcategory
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default CreateSubcategory;

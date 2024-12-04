import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
// import { Link } from "react-router-dom";
// import PreviewImage from "../../PreviewImage/PreviewImage";
// import { useFormik } from "formik";
import * as Yup from "yup";
import PreviewImage from "../../PreviewImage/PreviewImage";
import { BsCloudUpload } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext";
import PreviewImages from "../../PreviewImage/PreviewImages";
import { PulseLoader } from "react-spinners";
import Brands from "../../Home/Brands/Brands";
import Skeleton from "react-loading-skeleton";

function AddProduct() {
  const { baseUrl, setUserData, setToken, token } = useContext(UserContext);
  const [isOpenedCategory, setIsOpenedCategory] = useState(false);
  const [isOpenedSubcategory, setIsOpenedSubcategory] = useState(false);
  const [isOpenedBrand, setIsOpenedBrand] = useState(false);
  const [categoryValue, setCategoryValue] = useState(null);
  const [categoryError, setCategoryError] = useState(null);
  const [subcategoryValue, setSubcategoryValue] = useState(null);
  const [subcategoryError, setSubcategoryError] = useState(null);
  const [brandValue, setBrandValue] = useState(null);
  const [brandError, setBrandError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [subImagesErr, setSubImagesErr] = useState(null);
  const [err, setErr] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const navigate = useNavigate();

  const getAllCategories = async () => {
    setCategoriesLoading(true);
    const { data } = await axios.get(`${baseUrl}/category?fields=enName`);
    console.log(data.categories);
    setCategories(data.categories);
    setCategoriesLoading(false);
  };

  const getAllBrands = async () => {
    setBrandsLoading(true);
    const { data } = await axios.get(`${baseUrl}/brand?fields=enName`);
    console.log(data.brands);
    setBrands(data.brands);
    setBrandsLoading(false);
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
  }, []);

  const initialValues = {
    arName: "",
    enName: "",
    arDescription: "",
    enDescription: "",
    stock: "",
    price: "",
    discound: "",
    mainImage: null,
    subImages: null,
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
    arDescription: Yup.string()
      .matches(
        /^[\u0621-\u064A0-9 ]+$/,
        "You have to use just Arabic letters and numbers"
      )
      .min(3, "the minlengt of user Arabic description  is 2"),
    enDescription: Yup.string()
      .matches(
        /^[A-Za-z0-9 ]+$/,
        "You have to use just English letters and numbers"
      )
      .min(3, "the minlengt of user Arabic description  is 2"),
    price: Yup.number()
      .min(1, "the min of price is 1")
      .required("price is required"),
    discound: Yup.string()
      .min(0, "the min of discound is 0")
      .max(100, "the min of discound is 100"),
    stock: Yup.string()
      .min(1, "the min of discound is 1")
      .required("discound is required"),

    mainImage: Yup.mixed()
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

  function validateImageFormat(image) {
    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validTypes.includes(image.type)) {
      return false;
    }
    return true;
  }

  async function addProduct(values) {
    setIsLoading(true);
    if (brandError || categoryError || subcategoryError) {
      setIsLoading(false);
      return 0;
    }
    const {
      arName,
      enName,
      arDescription,
      enDescription,
      stock,
      price,
      discound,
      mainImage,
      subImages,
    } = values;
    if (!mainImage) {
      console.log("main");

      setIsLoading(false);
      return 0;
    }
    if (subImages?.length > 5) {
      setSubImagesErr("the limit of Image list is 5 images");
      setIsLoading(false);
      return 0;
    }

    const formData = new FormData();
    formData.append("arName", arName);
    formData.append("enName", enName);
    arDescription && formData.append("arDescription", arDescription);
    enDescription && formData.append("enDescription", enDescription);
    formData.append("stock", stock);
    formData.append("categoryId", categoryValue.categoryId);
    formData.append("subcategoryId", subcategoryValue.subcategoryId);
    formData.append("brandId", brandValue.brandId);
    formData.append("price", price);
    discound && formData.append("discound", discound);
    formData.append("mainImage", mainImage);
    if (subImages?.length > 0) {
      for (let i = 0; i < subImages.length; i++) {
        const image = subImages[i];
        if (!validateImageFormat(image)) {
          setSubImagesErr(
            "Invalid image format. Only JPG, JPEG, and PNG are allowed."
          );
          setIsLoading(false);
          return 0;
        }
      }
console.log(subImages);

      // Append images to FormData if validation passes
      subImages.forEach((image, index) => {
        formData.append(`subImages`, image);
      });
    }
console.log("form data", formData);

    const { data } = await axios
      .post(`${baseUrl}/product`, formData, {
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
          console.log(err.response.data);

          setErr(err.response.data.errMass);
        }
      });
    if (data.message == "Done") {
      setIsLoading(false);
      setErr(null);
    }
  }

  const handleSubmit = () => {
    if (!categoryValue?.categoryId) {
      setCategoryError("You've to choose a specific category");
    }
    if (!subcategoryValue?.subcategoryId) {
      setSubcategoryError("You've to choose a specific subcategory");
    }
    if (!brandValue?.brandId) {
      setBrandError("You've to choose a specific brand");
    }
    console.log("kgvbkjul");
    console.log(formik.errors);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("mainImage", file);
  };

  const handleSubImageChange = (event) => {
    const files = event.target.files;
    formik.setFieldValue("subImages", [...files]);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: addProduct,
  });

  return (
    <div>
      <h3 className="text-black font-semibold text-lg lg:text-xl">
        Create Product
      </h3>

      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-12 gap-5 mt-5"
      >
        <div className="col-span-full lg:col-span-6">
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
            } w-full text-lg mt-1 outline-none border-2 focus:border-main py-1 px-2`}
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

        <div className="col-span-full lg:col-span-6">
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
            } w-full text-lg mt-1 outline-none border-2 focus:border-main py-1 px-2`}
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

        <div className="col-span-full lg:col-span-6">
          <label className="font-medium text-black" htmlFor="arDescription">
            Description in Arabic
          </label>
          <textarea
            type="text"
            name="arDescription"
            id="arDescription"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.arDescription}
            rows={4}
            className={` ${
              formik.errors.arDescription && formik.touched.arDescription
                ? ""
                : "mb-2"
            }  w-full text-lg mt-1 outline-none resize-none border-2 focus:border-main py-1 px-2`}
            placeholder="Description in Arabic"
          ></textarea>
          {formik.errors.arDescription && formik.touched.arDescription ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.arDescription}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-6">
          <label className="font-medium text-black" htmlFor="enDescription">
            Description in English
          </label>
          <textarea
            type="text"
            name="enDescription"
            id="enDescription"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.enDescription}
            rows={4}
            className={` ${
              formik.errors.enDescription && formik.touched.enDescription
                ? ""
                : "mb-2"
            }  w-full text-lg mt-1 outline-none resize-none border-2 focus:border-main py-1 px-2`}
            placeholder="Description in English"
          ></textarea>
          {formik.errors.enDescription && formik.touched.enDescription ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.enDescription}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-4">
          <label className="font-medium text-black" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.price}
            className="w-full text-lg mt-1 outline-none border-2 focus:border-main py-1 px-2"
            placeholder="Price"
          />
          {formik.errors.price && formik.touched.price ? (
            <div
              className={`${
                formik.errors.price && formik.touched.price ? "" : "mb-2"
              }  mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full`}
            >
              {formik.errors.price}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-4">
          <label className="font-medium text-black" htmlFor="discound">
            Discound
          </label>
          <input
            type="number"
            name="discound"
            id="discound"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.discound}
            className={` ${
              formik.errors.discound && formik.touched.discound ? "" : "mb-2"
            }  w-full text-lg mt-1 outline-none border-2 focus:border-main py-1 px-2`}
            placeholder="Discound"
          />
          {formik.errors.discound && formik.touched.discound ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.discound}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-4">
          <label className="font-medium text-black" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            id="stock"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.stock}
            className={`${
              formik.errors.stock && formik.touched.stock ? "" : "mb-2"
            }  w-full text-lg mt-1 outline-none border-2 focus:border-main py-1 px-2`}
            placeholder="Stock"
          />
          {formik.errors.stock && formik.touched.stock ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.stock}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-4">
          <label
            onClick={() => setIsOpenedCategory(!isOpenedCategory)}
            htmlFor="category"
            className={`p-2 pr-[15%] block text-lg select-none w-full border-2 outline-none focus:border-main ${
              isOpenedCategory ? "border-main" : ""
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
                      setSubcategoryValue(null);
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

        <div className="col-span-full lg:col-span-4">
          <label
            onClick={() => setIsOpenedSubcategory(!isOpenedSubcategory)}
            className={`p-2 pr-[15%] block text-lg select-none w-full border-2 outline-none focus:border-main ${
              isOpenedSubcategory ? "border-main" : ""
            }  duration-300 relative ${
              subcategoryValue?.subcategoryId ? "text-black" : "text-gray-400"
            } text-start `}
          >
            {!subcategoryValue?.subcategoryId
              ? "Subcategory"
              : subcategoryValue.name}

            {isOpenedSubcategory ? (
              <AiOutlineCaretUp className="text-lg absolute top-1/2 text-main -translate-y-1/2 right-[5%]" />
            ) : (
              <AiOutlineCaretDown
                className={`text-lg absolute top-1/2 text-black -translate-y-1/2 right-[5%]`}
              />
            )}

            <div
              className={`${
                isOpenedSubcategory ? "block" : "hidden"
              } absolute max-h-[20vh] p-2  overflow-y-auto scrollbar-thin scrollbar-webkit  flex flex-col gap-1 border-2 bg-white left-0 top-full right-0 border-main text-center`}
            >
              {categoryValue?.categoryId &&
              categories.find((obj) => obj._id === categoryValue.categoryId)
                ?.subcategory?.length ? (
                categories
                  .find((obj) => obj._id === categoryValue.categoryId)
                  .subcategory.map((subcategory) => (
                    <div
                      key={subcategory._id}
                      onClick={() => {
                        setSubcategoryValue({
                          subcategoryId: subcategory._id,
                          name: subcategory.enName,
                        });
                        setSubcategoryError(null);
                      }}
                      className="py-1 rounded-md cursor-pointer text-main hover:text-white hover:bg-main font-medium duration-300"
                    >
                      {subcategory.enName}
                    </div>
                  ))
              ) : (
                <p>
                  {!categoryValue?.categoryId
                    ? "You've to choose a specific category"
                    : "There is no subcategories in this category"}
                </p>
              )}
            </div>
          </label>
          {subcategoryError ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {subcategoryError}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-4">
          <label
            onClick={() => setIsOpenedBrand(!isOpenedBrand)}
            className={`p-2 pr-[15%] block text-lg select-none w-full border-2 outline-none focus:border-main ${
              isOpenedBrand ? "border-main" : ""
            }  duration-300 relative ${
              brandValue?.brandId ? "text-black" : "text-gray-400"
            } text-start `}
          >
            {!brandValue?.brandId ? "Brand" : brandValue.name}
            {isOpenedBrand ? (
              <AiOutlineCaretUp className="text-lg absolute top-1/2 text-main -translate-y-1/2 right-[5%]" />
            ) : (
              <AiOutlineCaretDown
                className={`text-lg absolute top-1/2 text-black -translate-y-1/2 right-[5%]`}
              />
            )}

            <div
              className={`${
                isOpenedBrand ? "block" : "hidden"
              } absolute max-h-[20vh] p-2  overflow-y-auto scrollbar-thin scrollbar-webkit  flex flex-col gap-1 border-2 bg-white left-0 top-full right-0 border-main text-center`}
            >
              {brandsLoading ? (
                <Skeleton className="h-5 w-full rounded-md" count={2} />
              ) : (
                brands.map((brand) => (
                  <div
                    key={brand.enName}
                    onClick={() => {
                      setBrandValue({
                        brandId: brand._id,
                        name: brand.enName,
                      });
                      setBrandError(null);
                    }}
                    className="py-1 rounded-md cursor-pointer text-main hover:text-white hover:bg-main font-medium duration-300"
                  >
                    {brand.enName}
                  </div>
                ))
              )}
            </div>
          </label>
          {brandError ? (
            <div className=" mb-2 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {brandError}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-6">
          <label
            htmlFor="mainImage"
            className="font-medium text-sm md:text-base"
          >
            Main image
          </label>
          <input
            className="hidden"
            id="mainImage"
            name="mainImage"
            type="file"
            onChange={handleFileChange}
            accept="image/*"
          />

          <label
            className={`mt-1 ${
              formik.errors.mainImage && formik.touched.mainImage ? "" : "mb-3"
            } bg-white  font-medium border-2 focus:border-main cursor-pointer pt-2 pb-10 px-4 flex items-center gap-3 w-full`}
            htmlFor="mainImage"
          >
            attach a file <BsCloudUpload />
            {formik.values.mainImage?.name && (
              <div className="w-8">
                <PreviewImage file={formik.values.mainImage} />
              </div>
            )}
          </label>

          {formik.errors.mainImage && formik.touched.mainImage ? (
            <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {formik.errors.mainImage}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full lg:col-span-6">
          <label
            htmlFor="subImages"
            className="font-medium text-sm md:text-base"
          >
            Image list
          </label>

          <input
            className="hidden"
            id="subImages"
            name="subImages"
            type="file"
            onChange={handleSubImageChange}
            accept="image/*"
            multiple
          />

          <label
            className={`mt-1 ${
              formik.errors.subImages && formik.touched.subImages ? "" : "mb-3"
            } bg-white border-2 focus:border-main font-medium cursor-pointer pt-2 pb-10 px-4 flex items-center gap-3 w-full `}
            htmlFor="subImages"
          >
            attach a file <BsCloudUpload />
            {formik.values?.subImages?.length ? (
              <div className="">
                <PreviewImages files={formik.values.subImages} />
              </div>
            ) : (
              ""
            )}
          </label>

          {subImagesErr ? (
            <div className=" mb-3 rounded-md text-red-400 text-lg font-medium px-3 w-full">
              {subImagesErr}
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="col-span-full">
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
        </div>

        <div className="col-span-full">
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
              Create Product
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddProduct;

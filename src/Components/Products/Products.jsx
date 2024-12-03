import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import {
  FaChevronDown,
  FaChevronUp,
  FaAngleUp,
  FaAngleDown,
} from "react-icons/fa";
import Pagination from "../../utils/Pagination";
import { useQuery } from "react-query";
import Product from "./Product/Product";
import { UserContext } from "../../Context/UserContext";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import FelterLoading from "./SkeletonComponents/FelterLoading";
import filterImage from "../../assets/filrerIcon.svg";
import Skeleton from "react-loading-skeleton";
import ProductsLoading from "./SkeletonComponents/ProductsLoading";
// Filter Section for Categories and Brands
const FilterSection = ({
  title,
  items,
  selectedItems,
  handleCheckboxChange,
  isSeeMore,
  toggleSeeMore,
}) => (
  <div className="py-5 px-2 border-2 rounded-lg">
    <h2 className="font-bold px-5 text-2xl">{title}</h2>
    <div className="flex flex-col w-full  max-h-[20vh] overflow-y-auto scrollbar-thin scrollbar-webkit gap-2 mt-3">
      {isSeeMore
        ? items.map((item) => (
            <FilterItem
              key={item._id}
              item={item}
              selectedItems={selectedItems}
              handleCheckboxChange={handleCheckboxChange}
            />
          ))
        : items
            .slice(0, 2)
            .map((item) => (
              <FilterItem
                key={item._id}
                item={item}
                selectedItems={selectedItems}
                handleCheckboxChange={handleCheckboxChange}
              />
            ))}
    </div>
    <button
      onClick={toggleSeeMore}
      className="text-xl font-medium flex items-center px-5 gap-2 pt-2"
    >
      <span>see {isSeeMore ? "little" : "more"}</span>{" "}
      {isSeeMore ? <FaAngleUp /> : <FaAngleDown />}
    </button>
  </div>
);

const FilterItem = ({ item, selectedItems, handleCheckboxChange }) => (
  <div className="flex items-center justify-between px-5">
    <label htmlFor={item.enName} className="flex gap-2 cursor-pointer">
      <input
        type="checkbox"
        id={item.enName}
        value={item._id}
        checked={selectedItems.includes(item._id)}
        onChange={handleCheckboxChange}
      />
      {item.enName}
    </label>
    <p className="text-blackColor">{item.numOfProducts || 0}</p>
  </div>
);

const Products = () => {
  const { baseUrl } = useContext(UserContext);
  const [sortedOpened, setSortedOpened] = useState(false);
  const [sortedValue, setSortedValue] = useState("New Arrivals");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsLimits, setProductsLimits] = useState(3);
  const [isSeeCategoriesMore, setIsSeeCategoriesMore] = useState(false);
  const [isSeeBrandsMore, setIsSeeBrandsMore] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [products, setProducts] = useState([]);
  const [isOpenedFilter, setIsOpenedFilter] = useState(false);

  // Fetch initial products using React Query
  const {
    data: initialProductsData,
    isLoading,
    error,
  } = useQuery("fetchInitialProducts", () =>
    axios.get(`${baseUrl}/product?sort=-createdAt`)
  );

  const getFelterProducts = async () => {
    const filters = {
      brandIds: selectedBrands,
      categoryIds: selectedCategories,
    };
    !selectedBrands.length && delete filters.brandIds;
    !selectedCategories.length && delete filters.categoryIds;

    if (selectedFilter.length) {
      const data = await axios
        .post(`${baseUrl}/product/felterProducts?sort=-createdAt`, filters)
        .catch((err) => {
          console.log(err.response.data.errMass);
          setProducts([]);
        });
      if (data) setProducts(data?.data?.products);
    } else {
      // When no filters are selected, use the initial fetched products
      setProducts(initialProductsData?.data?.products || []);
    }
  };

  useEffect(() => {
    if (initialProductsData) {
      setProducts(initialProductsData?.data?.products || []);
    }
  }, [initialProductsData]);

  useEffect(() => {
    getFelterProducts();
  }, [selectedBrands, selectedCategories]);

  const handleRemoveElement = (data) => {
    const { id, name, type } = data;
    setSelectedFilter((prev) => prev.filter((item) => item.id !== id));
    type == "category"
      ? setSelectedCategories((prev) => prev.filter((item) => item !== id))
      : setSelectedBrands((prev) => prev.filter((item) => item !== id));
  };

  const handleCheckboxCategoryChange = (e) => {
    const { value, id, checked } = e.target;

    const keywords = { id: value, name: id, type: "category" };

    setSelectedFilter((prev) =>
      checked ? [...prev, keywords] : prev.filter((item) => item.id !== value)
    );

    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleCheckboxBrandChange = (e) => {
    const { value, id, checked } = e.target;

    const keywords = { id: value, name: id, type: "brand" };

    setSelectedFilter((prev) =>
      checked ? [...prev, keywords] : prev.filter((item) => item.id !== value)
    );

    setSelectedBrands((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleClearAll = () => {
    setSelectedFilter([]);
    setSelectedBrands([]);
    setSelectedCategories([]);
  };

  const getCategories = () => axios.get(`${baseUrl}/category`);
  const categories = useQuery("getCategories", getCategories);

  const getBrands = () => axios.get(`${baseUrl}/brand`);
  const brands = useQuery("getBrands", getBrands);

  const lastProductIndex = currentPage * productsLimits;
  const firstProductIndex = lastProductIndex - productsLimits;

  const currentProducts = products.length
    ? products
        .sort((a, b) =>
          sortedValue === "Price: ascending"
            ? a.price - b.price
            : sortedValue === "Price: descending"
            ? b.price - a.price
            : 0
        )
        .slice(firstProductIndex, lastProductIndex)
    : initialProductsData?.data?.products
        .sort((a, b) =>
          sortedValue === "Price: ascending"
            ? a.price - b.price
            : sortedValue === "Price: descending"
            ? b.price - a.price
            : 0
        )
        .slice(firstProductIndex, lastProductIndex);

  if (error) return <div>Error fetching data</div>;

  return (
    <>
      <Header header="Products" nameComponent="Products" />
      <section className="py-8">
        <div className="container lg:w-[90%] px-5 mx-auto">
          <div className="grid grid-cols-4 gap-5">
            <div
              className={`hidden lg:flex flex-col gap-5 col-span-4 lg:col-span-1 text-black`}
            >
              {categories.isLoading ? (
                <FelterLoading header={"Categories"} />
              ) : (
                <FilterSection
                  title="Categories"
                  items={categories.data?.data.categories || []}
                  selectedItems={selectedCategories}
                  handleCheckboxChange={handleCheckboxCategoryChange}
                  isSeeMore={isSeeCategoriesMore}
                  toggleSeeMore={() => setIsSeeCategoriesMore((prev) => !prev)}
                />
              )}

              {brands.isLoading ? (
                <FelterLoading header={"Brands"} />
              ) : (
                <FilterSection
                  title="Brands"
                  items={brands.data?.data.brands || []}
                  selectedItems={selectedBrands}
                  handleCheckboxChange={handleCheckboxBrandChange}
                  isSeeMore={isSeeBrandsMore}
                  toggleSeeMore={() => setIsSeeBrandsMore((prev) => !prev)}
                />
              )}
            </div>

            <div className="col-span-4 lg:col-span-3">
              <div className="bg-product p-2 rounded-md">
                <div className="flex items-center justify-between">
                  {isLoading ? (
                    <Skeleton className="h-5 w-52" />
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsOpenedFilter((prev) => !prev)}
                        className="lg:hidden p-2 rounded-md bg-white"
                      >
                        <img
                          className="w-7"
                          src={filterImage}
                          alt={filterImage}
                        />
                      </button>
                      <p className="text-blackColor">
                        We found{" "}
                        <span className="font-medium">
                          {products.length ||
                            initialProductsData?.data?.products?.length ||
                            0}
                        </span>{" "}
                        items for you!
                      </p>
                    </div>
                  )}

                  <button
                    className="p-1 relative px-2 rounded-md text-black bg-white flex items-center gap-3"
                    onClick={() => setSortedOpened((prev) => !prev)}
                  >
                    <div>
                      Sort by: <span>{sortedValue}</span>
                    </div>
                    {sortedOpened ? <FaChevronUp /> : <FaChevronDown />}
                    <ul
                      className={`${
                        sortedOpened ? "block absolute" : "hidden"
                      } top-full left-0 w-full rounded-md z-30 overflow-hidden bg-white`}
                    >
                      <li>
                        <button
                          onClick={() => setSortedValue("New Arrivals")}
                          className="p-1 hover:bg-product w-full text-start"
                        >
                          New Arrivals
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setSortedValue("Price: ascending")}
                          className="p-1 hover:bg-product w-full text-start"
                        >
                          Price: ascending
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => setSortedValue("Price: descending")}
                          className="p-1 hover:bg-product w-full text-start"
                        >
                          Price: descending
                        </button>
                      </li>
                    </ul>
                  </button>
                </div>
              </div>

              {selectedFilter.length ? (
                <div className=" p-2 mt-3 rounded-md">
                  <div className="flex items-center gap-3">
                    <p className="text-blackColor">
                      Found{" "}
                      <span className="font-medium">
                        {products.length ||
                          initialProductsData?.data?.products?.length ||
                          0}
                      </span>{" "}
                      items
                    </p>
                    {selectedFilter.map((btn) => (
                      <button
                        onClick={() => handleRemoveElement(btn)}
                        className="text-white bg-main py-[6px] px-3 rounded-md flex items-center gap-1 font-medium"
                      >
                        <IoClose />
                        {btn.name}
                      </button>
                    ))}
                    <button
                      onClick={handleClearAll}
                      className=" py-[6px] px-1 text-lg underline"
                    >
                      Clear all
                    </button>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div
                className={`${
                  isOpenedFilter ? "flex" : "hidden"
                }  lg:hidden flex-col gap-5 mt-5 col-span-4 lg:col-span-1 text-black`}
              >
                {categories.isLoading ? (
                  <FelterLoading header={"Categories"} />
                ) : (
                  <FilterSection
                    title="Categories"
                    items={categories.data?.data.categories || []}
                    selectedItems={selectedCategories}
                    handleCheckboxChange={handleCheckboxCategoryChange}
                    isSeeMore={isSeeCategoriesMore}
                    toggleSeeMore={() =>
                      setIsSeeCategoriesMore((prev) => !prev)
                    }
                  />
                )}

                {brands.isLoading ? (
                  <FelterLoading header={"Brands"} />
                ) : (
                  <FilterSection
                    title="Brands"
                    items={brands.data?.data.brands || []}
                    selectedItems={selectedBrands}
                    handleCheckboxChange={handleCheckboxBrandChange}
                    isSeeMore={isSeeBrandsMore}
                    toggleSeeMore={() => setIsSeeBrandsMore((prev) => !prev)}
                  />
                )}

                <button
                  onClick={() => setIsOpenedFilter(false)}
                  className="py-2 px-4 bg-main flex items-center gap-1 text-white rounded-md w-fit"
                >
                  save (
                  <span className="font-medium">
                    {products.length ||
                      initialProductsData?.data?.products?.length ||
                      0}
                  </span>
                  )
                </button>
              </div>

              <div
                className={`${
                  isOpenedFilter ? "hidden" : "grid"
                } lg:grid grid-cols-12 gap-6 mt-6`}
              >
                {isLoading ? (
                  Array(6)
                    .fill(0)
                    .map((item, index) => <ProductsLoading key={index} />)
                ) : currentProducts?.length ? (
                  currentProducts.map((product) => (
                    <Product key={product._id} product={product} />
                  ))
                ) : (
                  <div className="flex items-center justify-center col-span-full h-[50vh] text-xl font-bold">
                    No products found with these filters
                  </div>
                )}
                {currentProducts?.length && (
                  <Pagination
                    currentPage={currentPage}
                    totalRecords={
                      products.length ||
                      initialProductsData?.data?.products?.length ||
                      0
                    }
                    recordsLimits={productsLimits}
                    setCurrentPage={setCurrentPage}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;

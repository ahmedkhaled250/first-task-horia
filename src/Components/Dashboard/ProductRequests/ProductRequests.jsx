import React, { useContext, useState } from "react";

import { useQuery } from "react-query";
import { UserContext } from "../../../Context/UserContext";
import axios from "axios";
import ProductRequestData from "./ProductRequestData/ProductRequestData";
function ProductRequests() {
  const { baseUrl, token, setToken, setUserData } = useContext(UserContext);
  const [isDone, setIsDone] = useState(false);
  const [producrDeleted, setProducrDeleted] = useState(null);
  const { data, isLoading, error } = useQuery("getProductRequests", () =>
    axios.get(`${baseUrl}/product/productRequests`)
  );

  if (isDone && producrDeleted?.enName) {
    const index = data?.data?.users.indexOf(producrDeleted);
    if (index !== -1) {
      data?.data?.users.splice(index, 1); // Removes 1 item at the found index
    }
    setProducrDeleted(null);
    setIsDone(false);
  }

  return (
    <>
      {data?.data?.users?.length ? (
        <div className="p-5">
          <table className="bg-white w-[90%] mx-auto rounded-md overflow-hidden">
            <thead className="grid grid-cols-4 gap-10 items-center justify-between w-full">
              <th className="py-3 col-span-1 border-b-2 flex items-center justify-center">
                <td>Name og trader</td>
              </th>
              <th className="py-3 col-span-1 border-b-2 flex items-center justify-center">
                {" "}
                <td>Stock</td>
              </th>
              <th className="py-3 col-span-1 border-b-2 flex items-center justify-center">
                {" "}
                <td>Price</td>
              </th>
              <th className="py-3 bg-profileColor col-span-1 border-b-2 flex items-center justify-center">
                {" "}
                <td>Action</td>
              </th>
            </thead>
            <tbody className=" w-full">
              {data?.data?.products.map((product) => (
                <ProductRequestData
                  product={product}
                  length={data.data.products.length}
                  indexOfProduct={data.data.products.indexOf(product)}
                  setIsDone={setIsDone}
                  setProducrDeleted={setProducrDeleted}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="size-full flex items-center justify-center">
          <p className="p-5 text-lg font-medium bg-white rounded-lg">
            There is no request right now
          </p>
        </div>
      )}
    </>
  );
}

export default ProductRequests;

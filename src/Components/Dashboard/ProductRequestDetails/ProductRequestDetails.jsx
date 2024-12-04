import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../../Context/UserContext";
import axios from "axios";
import { PulseLoader } from "react-spinners";

function ProductRequestDetails() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const { baseUrl, token, setToken, setUserData } = useContext(UserContext);

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  const getProduct = async () => {
    const { data } = await axios.get(`${baseUrl}/product/${id}`);
    console.log(data.product);

    setProduct(data.product);
  };

  const acceptAccount =async (id) => {
    console.log(id);

    setAcceptLoading(true);
    const { data } = await axios
      .patch(
        `${baseUrl}/user/${id}/accept`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Hamada__${token}`,
          },
        }
      )
      .catch((err) => {
        setAcceptLoading(false);

        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        }
      });
    if (data.message == "Done") {
      setAcceptLoading(false);
      console.log(data);
      navigate("/dashboard/productRequests");
    }
  };
  const rejectAccount = async (id) => {
    console.log(id);

    setRejectLoading(true);
    const { data } = await axios
      .patch(
        `${baseUrl}/user/${id}/refused`,
        {},
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Hamada__${token}`,
          },
        }
      )
      .catch((err) => {
        setRejectLoading(false);
        if (err?.response?.data?.errMass == "TokenExpiredError: jwt expired") {
          localStorage.clear();
          setToken(null);
          setUserData(null);
          navigate("/login");
        }
      });
    if (data.message == "Done") {
      setRejectLoading(false);
      console.log(data);
      navigate("/dashboard/productRequests");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="p-10">
      <div className="bg-white ronded-md">
        <div className="w-[80%] mx-auto font-medium">
          <h3 className="text-center text-2xl font-bold text-main">
            {product?.enName}
          </h3>
          {/* <div className="flex items-center gap-10">
              
              </div> */}
          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Trader name:</p>
            <p className="w-1/2">{product?.createdBy.userName}</p>
          </div>
          {product?.enDescription ? (
            <div className="flex items-center py-5 gap-10 ">
              <p className="w-1/2">Description:</p>
              <p className="w-1/2">{product.enDescription}</p>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Price:</p>
            <p className="w-1/2">{product?.price}</p>
          </div>
          {product?.discound ? (
            <div className="flex items-center py-5 gap-10 ">
              <p className="w-1/2">Discount:</p>
              <p className="w-1/2">{product.discound}</p>
            </div>
          ) : (
            ""
          )}

          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Stock:</p>
            <p className="w-1/2">{product?.stock}</p>
          </div>
          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Category:</p>
            <p className="w-1/2">{product?.categoryId.enName}</p>
          </div>
          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Subcategory:</p>
            <p className="w-1/2">{product?.subcategoryId.enName}</p>
          </div>
          <div className="flex items-center py-5 gap-10 ">
            <p className="w-1/2">Brand:</p>
            <p className="w-1/2">{product?.brandId.enName}</p>
          </div>
          <div className="flex items-center py-5 gap-10 ">
            {acceptLoading ? (
              <button
                disabled
                className="py-2 w-1/4 outline-none rounded-lg text-white bg-main"
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
                onClick={() => acceptAccount(product?._id)}
                className="py-2 w-1/4 outline-none rounded-lg text-white bg-main"
              >
                Accept
              </button>
            )}
            {rejectLoading ? (
              <button
                disabled
                className="py-2 w-1/4 outline-none rounded-md bg-profileColor"
              >
                <PulseLoader
                  color="#000"
                  cssOverride={{}}
                  loading
                  margin={2}
                  size={7}
                  speedMultiplier={1}
                />
              </button>
            ) : (
              <button
                onClick={() => rejectAccount(product._id)}
                className="py-2 w-1/4 outline-none rounded-md bg-profileColor"
              >
                Reject
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductRequestDetails;

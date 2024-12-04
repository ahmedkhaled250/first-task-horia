import React, { useContext, useState } from "react";
import seeMore from "../../../../assets/see-more.svg";
import deleteProduct from "../../../../assets/icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";
import { PulseLoader } from "react-spinners";
import axios from "axios";
function ProductRequestData({
  product,
  length,
  indexOfProduct,
  setProducrDeleted,
  setIsDone,
}) {
  const { baseUrl, token, setToken, setUserData } = useContext(UserContext);

  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const navigate = useNavigate();

  const acceptAccount = async (id) => {
    setAcceptLoading(true);
    const { data } = axios
      .patch(
        `${baseUrl}/product/${id}/accept`,
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
      setProducrDeleted(product);
      setIsDone(true);
      console.log(data);
      setAcceptLoading(false);
    }
  };
  const rejectAccount = async (id) => {
    setRejectLoading(true);
    const { data } = await axios
      .patch(
        `${baseUrl}/product/${id}/refused`,
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
      setProducrDeleted(product);
      setIsDone(true);
      console.log(data);

      setRejectLoading(false);
    }
  };

  return (
    <div
      key={product._id}
      className={`grid grid-cols-4 items-center justify-between gap-10 ${
        length - 1 == indexOfProduct ? "border-b-2" : " "
      }`}
    >
      <tr
        className={`h-20 col-span-1   flex items-center justify-center ${
          length - 1 == indexOfProduct ? "" : " border-b-2"
        }`}
      >
        <td>{product.createdBy.userName}</td>
      </tr>
      <tr
        className={`h-20 col-span-1   flex items-center justify-center ${
          length - 1 == indexOfProduct ? "" : " border-b-2"
        }`}
      >
        {" "}
        <td>{product.stock}</td>
      </tr>
      <tr
        className={`h-20 col-span-1   flex items-center justify-center ${
          length - 1 == indexOfProduct ? "" : " border-b-2"
        }`}
      >
        {" "}
        <td>{product.finalPrice}</td>
      </tr>
      <tr
        className={`h-20 col-span-1   flex items-center justify-center ${
          length - 1 == indexOfProduct ? "" : " border-b-2"
        }`}
      >
        {" "}
        <td className="flex items-center gap-3">
          {acceptLoading ? (
            <button
              disabled
              className="py-2 px-3 rounded-full bg-main text-white"
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
              className="py-2 px-3 rounded-full bg-main text-white"
            >
              Accept
            </button>
          )}
          <Link to={`/dashboard/productRequestDetails/${product._id}`}>
            <img src={seeMore} alt="seeMore" />
          </Link>

          {rejectLoading ? (
            <button disabled className="P-2 outline-none">
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
              className="P-2 outline-none"
            >
              <img src={deleteProduct} alt="deleteProduct" />
            </button>
          )}
        </td>
      </tr>
    </div>
  );
}

export default ProductRequestData;

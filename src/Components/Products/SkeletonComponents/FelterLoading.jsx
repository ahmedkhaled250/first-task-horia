import React from "react";
import Skeleton from "react-loading-skeleton";

function FelterLoading({header}) {
  return (
    <div className="p-5 border-2 rounded-lg">
      <h2 className="font-bold mb-2 text-2xl">{header}</h2>
      <Skeleton count={3} className=" my-1 h-5 rounded-md" />
      <Skeleton count={1} className="w-[60%] h-5 mt-2 rounded-md" />
    </div>
  );
}

export default FelterLoading;

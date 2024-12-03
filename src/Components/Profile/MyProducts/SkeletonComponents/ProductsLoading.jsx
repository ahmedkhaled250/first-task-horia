import React from "react";
import Skeleton from "react-loading-skeleton";

function ProductsLoading() {
  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 xl:col-span-3">
      <div className="rounded-lg overflow-hidden bg-white shadow-md">
        <Skeleton className="h-60 rounded-none py-3" />

        <div className="p-3">
          <Skeleton className="h-5 rounded-md my-3" />
          <Skeleton className="h-5 rounded-md" />
          <Skeleton className="h-5 rounded-md my-2" />
        </div>
      </div>
    </div>
  );
}

export default ProductsLoading;

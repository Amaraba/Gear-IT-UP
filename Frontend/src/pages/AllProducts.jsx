import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url);
    const dataResponse = await response.json();

    console.log("product data", dataResponse);

    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);

  return (
    <div>
      <div className=" bg-lightgray py-2 px-4 flex flex-wrap gap-2 justify-between items-center">
        <h2 className="font-bold text-lg">All Products</h2>
        <button
          className="border-2 border-orange bg-orange text-white hover:bg-gray-300 hover:text-orange transition-all py-1 px-3 rounded-full font-bold "
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload Products
        </button>
      </div>

      {/**all product */}
      <div className="flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-180px)] overflow-y-auto">
        {allProduct.map((product, index) => {
          return (
            <AdminProductCard
              data={product}
              key={index + "allProduct"}
              fetchdata={fetchAllProduct}
            />
          );
        })}
      </div>

      {/**upload prouct component */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchData={fetchAllProduct}
        />
      )}
    </div>
  );
};

export default AllProducts;

import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(7).fill(null);

  const fetchCategoryProduct = async () => {
    setLoading(true);
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false);
    setCategoryProduct(dataResponse.data);
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 justify-evenly overflow-scroll scrollbar-none">
        {loading
          ? categoryLoading.map((el, index) => {
              return (
                <div
                  className="h-16 w-16 md:w-24 md:h-24 rounded-xl overflow-hidden bg-slate-200 animate-pulse"
                  key={"categoryLoading" + index}
                ></div>
              );
            })
          : categoryProduct.map((product, index) => {
              return (
                <Link
                  to={"/product-category?category=" + product?.category}
                  className="cursor-pointer"
                  key={product?.category}
                >
                  <div className="w-16 h-16 md:w-24 md:h-24 rounded-xl overflow-hidden p-4 border-[3px] border-orange flex items-center justify-center ">
                    <img
                      src={product?.productImage[0]}
                      alt={product?.category}
                      className="h-full object-scale-down mix-blend-multiply scale-150 hover:scale-125 transition-all"
                    />
                  </div>
                  <p className="text-center text-xs md:text-base font-medium capitalize line-clamp-1">
                    {product?.category}
                  </p>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default CategoryList;

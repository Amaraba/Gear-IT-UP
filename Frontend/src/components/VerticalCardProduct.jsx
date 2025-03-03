import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(6).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);

    // console.log("horizontal data", categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 300;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all justify-between"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div
                  className="w-full min-w-[150px] md:min-w-[250px] max-w-[150px] md:max-w-[250px] p-1 rounded-sm shadow "
                  key={"VerticalCardProduct" + index}
                >
                  <div className="bg-slate-200 h-40 md:h-60 p-4 min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid gap-3">
                    <h2 className="p-1 py-3 animate-pulse rounded-full bg-slate-200"></h2>
                    <p className="p-1 py-2 animate-pulse rounded-full bg-slate-200"></p>
                    <div className="flex gap-3">
                      <p className="p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                      <p className=" p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full"></p>
                    </div>
                    <button className="px-3 py-2 rounded-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[150px] md:min-w-[250px] max-w-[150px] md:max-w-[250px] border border-black rounded-sm shadow"
                  key={product.productName}
                >
                  <div className="bg-lightgray h-40 md:h-60 min-w-[145px] p-1.5 flex justify-center items-center">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down hover:scale-105 h-full transition-all"
                    />
                  </div>
                  <div className="p-2 grid gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                      {product?.productName}
                    </h2>
                    <div className="  md:flex gap-3 justify-between">
                      <p className="capitalize text-slate-500">
                        {product?.category}
                      </p>
                      <p className=" max-md:hidden capitalize text-slate-500">
                        {product?.brandName}
                      </p>
                    </div>
                    <div className=" md:flex gap-3 justify-self-center">
                      <p className="text-orange font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through ">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    {/* <button
                      className="text-sm bg-orange hover:bg-darkslategray-400 text-white w-full justify-self-center px-3 py-1 rounded-full"
                      onClick={(e) => handleAddToCart(e, product?._id)}
                    >
                      Add to Cart
                    </button> */}
                    {product?.stockQuantity == 0 ? (
                      <button className="text-sm bg-red text-white w-full justify-self-center px-3 py-1 rounded-full cursor-default">
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        className="text-sm bg-orange hover:bg-darkslategray-400 text-white w-full justify-self-center px-3 py-1 rounded-full"
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default VerticalCardProduct;

import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";
import addToCart from "../helpers/addToCart";
import Context from "../context";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

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
                  className="w-full min-w-[280px] md:min-w-[330px] max-w-[280px] md:max-w-[330px] h-36 p-1 bg-white rounded-sm shadow flex"
                  key={"HorizontalCardProduct" + index}
                >
                  <div className="bg-slate-200 h-full p-2 min-w-[125px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-2">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-orange font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                      <p className="text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full"></p>
                    </div>
                    <button className="text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <Link
                  to={"/product/" + product?._id}
                  className="w-full min-w-[280px] md:min-w-[330px] max-w-[280px] md:max-w-[330px] h-32 md:h-36  border border-black rounded-sm shadow flex"
                  key={product.productName}
                >
                  <div className="bg-lightgray h-full p-2 min-w-[125px] md:min-w-[145px]">
                    <img
                      src={product.productImage[0]}
                      className="object-scale-down h-full max-md:scale-105 hover:scale-110 transition-all"
                    />
                  </div>
                  <div className="p-1 md:p-2 grid">
                    <h2 className=" font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
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
                    <div className="md:flex gap-3 justify-self-center">
                      <p className="text-orange font-medium">
                        {displayINRCurrency(product?.sellingPrice)}
                      </p>
                      <p className="text-slate-500 line-through">
                        {displayINRCurrency(product?.price)}
                      </p>
                    </div>
                    {/* <button
                      className="text-sm bg-orange hover:bg-darkslategray-400 text-white w-32 justify-self-center px-3 py-0.5 rounded-full"
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

export default HorizontalCardProduct;

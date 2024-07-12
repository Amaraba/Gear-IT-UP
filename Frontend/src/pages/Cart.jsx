import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINRCurrency from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(3).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });

    const responseData = await response.json();

    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    await fetchData();
  };

  useEffect(() => {
    setLoading(true);
    handleLoading();
    setLoading(false);
  }, []);

  const increaseQty = async (id, qty) => {
    if (qty < 5) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty + 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    } else {
      toast.error("Reached Max Quantity! Contact Us For Bulk Order");
    }
  };

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });

      const responseData = await response.json();

      if (responseData.success) {
        fetchData();
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    const responseData = await response.json();

    if (responseData.success) {
      fetchData();
      context.fetchUserAddToCart();
    }
  };

  const handlePayment = async () => {
    console.log("env testing", import.meta.env.VITE_STRIPE_PUBLIC_KEY);
    const stripePromise = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLIC_KEY
    );
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        cartItems: data,
      }),
    });

    const responseData = await response.json();

    if (responseData?.id) {
      stripePromise.redirectToCheckout({ sessionId: responseData.id });
    }

    console.log("payment response", responseData);
  };

  const totalQty = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
  const totalPrice = data.reduce(
    (preve, curr) => preve + curr.quantity * curr?.productId?.sellingPrice,
    0
  );
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5"> YOUR CART IS CURRENTLY EMPTY.</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:justify-evenly p-4">
        {/***view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart?.map((el, index) => {
                return (
                  <div
                    key={el + "Add To Cart Loading" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full h-fit my-2 border border-darkslategray-400 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-100 rounded">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply "
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/**delete product */}
                      <div
                        className="absolute bottom-1 right-1 p-2 text-orange rounded-full hover:bg-orange hover:text-white cursor-pointer"
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete />
                      </div>

                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500">
                        {product?.productId.category}
                      </p>
                      <div className="flex items-center justify-between flex-wrap ">
                        <p className="text-orange font-medium text-lg">
                          {displayINRCurrency(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINRCurrency(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-orange text-orange hover:bg-orange hover:text-white w-6 h-6 flex justify-center items-end rounded"
                          onClick={() =>
                            decraseQty(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-orange text-orange hover:bg-orange hover:text-white w-6 h-6 flex justify-center items-end rounded "
                          onClick={() =>
                            increaseQty(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>

        {/***summary  */}
        {data[0] && (
          <div className="w-full max-w-sm max-lg:self-center lg:mt-2.5">
            {loading ? (
              <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
            ) : (
              <div className="p-4 w-full h-fit max-w-sm rounded-lg border-2 border-orange">
                <h2 className="text-white bg-darkslategray-400 px-4 py-1.5 m-1 rounded-full text-xl font-semibold text-center">
                  Cart Summary
                </h2>
                <div className="flex items-center justify-between px-4 mt-4 gap-2 font-medium text-lg text-slate-800">
                  <p>Quantity:</p>
                  <p>{totalQty}</p>
                </div>

                <div className="flex items-center justify-between px-4 mb-4 gap-2 font-medium text-lg text-slate-800">
                  <p>Total Price:</p>
                  <p>{displayINRCurrency(totalPrice)}</p>
                </div>
                <div className=" flex justify-center">
                  <button
                    className="text-lg hover:bg-lightgray bg-orange p-1 rounded-full  text-white w-3/4 mt-2"
                    onClick={handlePayment}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

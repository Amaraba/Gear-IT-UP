import "./App.css";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }

    // console.log("user-data", dataResponse);
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url, {
      method: SummaryApi.addToCartProductCount.method,
      credentials: "include",
    });

    const dataApi = await dataResponse.json();
    // console.log("dataApi", dataApi);
    setCartProductCount(dataApi?.data?.count);
  };

  useEffect(() => {
    /**user Details */
    fetchUserDetails();
    /**User Cart product */
    fetchUserAddToCart();
  }, []);
  return (
    <>
      <div className="App">
        <Context.Provider
          value={{
            fetchUserDetails, //fetching user Details
            cartProductCount, // current user add to cart product count,
            fetchUserAddToCart,
          }}
        >
          <ToastContainer position="bottom-center" />
          <Header />
          <main className="pt-20 sm:pt-14">
            <Outlet />
          </main>
          <Footer />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;

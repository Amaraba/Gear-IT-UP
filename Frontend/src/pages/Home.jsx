import React from "react";
import CategoryList from "../components/CategoryList";
import BannerProduct from "../components/BannerProduct";
import HorizontalCardProduct from "../components/HorizontalCardProduct";
import VerticalCardProduct from "../components/VerticalCardProduct";
import FeaturedProducts from "../components/FeaturedProducts";
import AboutUs from "../components/AboutUs";

const Home = () => {
  return (
    <div>
      <CategoryList />
      <BannerProduct />
      <FeaturedProducts category={"cooler"} heading={"Featured Products"} />
      <HorizontalCardProduct
        category={"cabinet"}
        heading={"Popular Cabinet/Cases"}
      />
      <HorizontalCardProduct category={"cooler"} heading={"Popular Cooler"} />
      <VerticalCardProduct
        category={"graphics card"}
        heading={"Popular Graphics Card"}
      />
      <VerticalCardProduct
        category={"motherboard"}
        heading={"Popular Motherboard"}
      />
      <VerticalCardProduct
        category={"processor"}
        heading={"Popular Processor"}
      />
      <AboutUs />
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import productCategory from "../helpers/productCategory";
import VerticalCard from "../components/VerticalCard";
import SummaryApi from "../common";

const CategoryProduct = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const urlSearch = new URLSearchParams(location.search);
  const urlCategoryListinArray = urlSearch.getAll("category");

  const urlCategoryListObject = {};
  urlCategoryListinArray.forEach((el) => {
    urlCategoryListObject[el] = true;
  });

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject);
  const [filterCategoryList, setFilterCategoryList] = useState([]);

  const [sortBy, setSortBy] = useState("");

  const fetchData = async () => {
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        category: filterCategoryList,
      }),
    });

    const dataResponse = await response.json();
    setData(dataResponse?.data || []);
  };

  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target;

    setSelectCategory((preve) => {
      return {
        ...preve,
        [value]: checked,
      };
    });
  };

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory)
      .map((categoryKeyName) => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName;
        }
        return null;
      })
      .filter((el) => el);

    setFilterCategoryList(arrayOfCategory);

    //format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) => {
      if (arrayOfCategory.length - 1 === index) {
        return `category=${el}`;
      }
      return `category=${el}&&`;
    });

    navigate("/product-category?" + urlFormat.join(""));
  }, [selectCategory]);

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target;

    setSortBy(value);

    if (value === "asc") {
      setData((preve) => preve.sort((a, b) => a.sellingPrice - b.sellingPrice));
    }

    if (value === "dsc") {
      setData((preve) => preve.sort((a, b) => b.sellingPrice - a.sellingPrice));
    }
  };
  useEffect(() => {
    fetchData();
  }, [filterCategoryList]);

  useEffect(() => {}, [sortBy]);

  return (
    <div className="container mx-auto">
      {/***desktop version */}
      <div className="grid grid-cols-[140px,1fr] md:grid-cols-[250px,1fr]">
        {/***left side */}
        <div className="bg-slate-200 p-2 min-h-[calc(100vh-96px)] overflow-y-auto">
          {/**sort by */}
          <div className=" font-medium">
            <h3 className="text-base text-center uppercase font-semibold text-slate-700 border-y-2 pb-1 border-slate-400">
              Sort by
            </h3>

            <form className="text-sm flex flex-col gap-2 py-4">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "asc"}
                  onChange={handleOnChangeSortBy}
                  value={"asc"}
                />
                <label>Price - Low to High</label>
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === "dsc"}
                  onChange={handleOnChangeSortBy}
                  value={"dsc"}
                />
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

          {/**filter by */}
          <div className="font-medium">
            <h3 className="text-base text-center uppercase font-semibold text-slate-700 border-y-2 pb-1 border-slate-400">
              Category
            </h3>

            <form className="text-sm flex flex-col gap-2 py-4">
              {productCategory.map((categoryName, index) => {
                return (
                  <div
                    className="flex items-center gap-3"
                    key={categoryName.id}
                  >
                    <input
                      type="checkbox"
                      name={"category"}
                      checked={selectCategory[categoryName?.value]}
                      value={categoryName?.value}
                      id={categoryName?.value}
                      onChange={handleSelectCategory}
                    />
                    <label htmlFor={categoryName?.value}>
                      {categoryName?.label}
                    </label>
                  </div>
                );
              })}
            </form>
          </div>
        </div>

        {/***right side ( product ) */}
        <div className="px-3">
          <p className="font-medium text-slate-800 text-lg my-2">
            Search Results : {data.length}
          </p>

          <div className="h-[calc(100vh-140px)] overflow-y-auto">
            {data.length !== 0 && !loading && (
              <VerticalCard data={data} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProduct;

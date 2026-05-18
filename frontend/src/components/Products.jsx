import React, { useState } from "react";
import Cards from "./Cards";
import { useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
const API = import.meta.env.VITE_API_URL;

function Products() {
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`${API}/product`);
        console.log(res.data);
        setProduct(res.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getProduct();
  }, []);

  let filteredProducts = [...product];

  // SEARCH FILTER
  filteredProducts = filteredProducts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  // CATEGORY FILTER
  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(
      (item) => item.category === selectedCategory,
    );
  }

  // SORTING
  if (sortOrder === "low") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOrder === "high") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  //Reset
  const handleReset = () => {
    setSearch("");
    setSelectedCategory("All");
    setSortOrder("");
  };
  return (
    <>
      <div className="max-w-screen-2xl mx-auto px-4 md:px-20 pt-20 flex flex-row h-screen overflow-hidden">
        {/* SIDEBAR (25%) - Modification: Added h-full and border-r */}
        <div className="w-1/4 h-full border-r bg-base-100 overflow-hidden shadow-md">
          <div className="p-6 md:p-10 space-y-6">
            <h2 className="text-xl font-bold">Filters</h2>

            {/* Search */}
            <div>
              <p className="font-semibold mb-2">Search</p>
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full h-10 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <p className="font-semibold mb-2">Category</p>
              <div className="flex flex-col gap-2">
                {["All", "Mobile", "Laptop", "Headphone"].map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="radio radio-primary radio-sm"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <p className="font-semibold mb-2">Sort By</p>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => setSortOrder("low")}
                    className="radio radio-primary radio-sm"
                  />
                  <span className="text-sm">Low to High</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => setSortOrder("high")}
                    className="radio radio-primary radio-sm"
                  />
                  <span className="text-sm">High to Low</span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2 pt-4">
              <button
                onClick={handleReset}
                className="btn btn-ghost btn-sm w-full border border-base-300 bg-blue-700 text-white"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
        {/* Products */}
        {/* PRODUCTS (75%) - Modification: Added h-full and overflow-y-auto */}
        <main className="w-3/4 h-full overflow-y-auto bg-base-100 shadow-md">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Product Collection</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <FiSearch className="text-6xl text-gray-400 mb-4" />
                  <h1 className="text-2xl font-bold">Oops no items found</h1>

                  <p className="text-gray-500 mt-2">
                    Try changing your filters
                  </p>
                </div>
              ) : (
                filteredProducts.map((item) => {
                  return (
                    <Cards
                      item={item}
                      key={item.id}
                    />
                  );
                })
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Products;

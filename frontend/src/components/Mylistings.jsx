import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { FiPackage } from "react-icons/fi";
import toast from "react-hot-toast";
import MyProductCard from "./MyProductCard";
const API = import.meta.env.VITE_API_URL;

function Products() {
  // Move JSON data to state so we can add/delete items visually
  const [product, setProduct] = useState([]);
  const [search, setSearch] = useState("");
  const [fileName, setFileName] = useState("No file chosen"); // For file uploading name
  const [authUser] = useAuth();
  const myProduct = [...product];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const imageRegister = register("image", {
    required: true,
  }); // For file uploading name

  // const onSubmit = (data) => console.log(data);

  useEffect(() => {
    const getMyProduct = async () => {
      try {
        const res = await axios.get(
          `${API}/product/my-products/${authUser._id}`,
        );
        console.log(res.data);
        setProduct(res.data);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    getMyProduct();
  }, []);

  // Called when form is submitted and passes validation
  const onSubmit = async (data) => {
    try {
      // react-hook-form gives us data.image as a FileList, grab the first file
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("category", data.category);
      formData.append("price", data.price);
      formData.append("contact_number", data.contact_number);
      formData.append("address", data.address);
      formData.append("description", data.description);
      formData.append("userId", authUser._id);
      formData.append("username", authUser.username);
      if (data.image[0]) {
        formData.append("image", data.image[0]); // must match upload.single("image")
      }

      const res = await axios.post(`${API}/product`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Add new product to local state so it appears immediately
      setProduct((prev) => [res.data.product, ...prev]);

      reset();
      setFileName("No file chosen");
      document.getElementById("upload_modal").close();
      toast.success("Product uploaded successfully");
    } catch (error) {
      console.log("Upload error: ", error);
      toast.error("Upload failed. Please try again.");
    }
  };

  let filteredProducts = [...myProduct];

  // SEARCH FILTER
  filteredProducts = filteredProducts.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = (id) => {
    setProduct((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-4 md:px-20 pt-20 flex flex-row h-screen overflow-hidden">
        {/* SIDEBAR (25%) */}
        <div className="w-1/4 h-full border-r bg-base-100 overflow-hidden shadow-md">
          <div className="p-6 md:p-10 space-y-6">
            <h2 className="text-xl font-bold text-primary">My Dashboard</h2>

            {/* UPLOAD BUTTON IN SIDEBAR */}
            <button
              className="btn btn-primary w-full"
              onClick={() =>
                document.getElementById("upload_modal").showModal()
              }
            >
              + Upload New Item
            </button>

            {/* Existing Filters... */}
            <div>
              <p className="font-semibold mb-2">Filters</p>
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered w-full h-10 focus:outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* MAIN SECTION (75%) */}
        <main className="w-3/4 h-full overflow-y-auto bg-base-100 shadow-md">
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">My Listings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 pb-12">
              {myProduct.length === 0 ? (
                <div className="col-span-full text-center py-10">
                  <FiPackage className="text-6xl text-gray-400 mb-4" />
                  <h1 className="text-2xl font-bold">No Products Listed Yet</h1>

                  <p className="text-gray-500 mt-2">
                    Start by uploading your first product.
                  </p>
                </div>
              ) : (
                filteredProducts.map((item) => (
                  <MyProductCard
                    item={item}
                    key={item._id}
                    onDelete={handleDelete}
                  />
                ))
              )}
            </div>
          </div>
        </main>
      </div>

      {/* --- DAISYUI UPLOAD MODAL --- */}
      {/* ---------------- UPLOAD MODAL ---------------- */}
      <dialog id="upload_modal" className="modal">
        {/* Modal Box: Slightly off-white background to make white fields "pop" */}
        <div className="modal-box max-w-2xl bg-slate-50 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] overflow-x-hidden border-none rounded-3xl">
          <h3 className="font-bold text-2xl mb-8 text-slate-800 tracking-tight">
            Upload new product
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            method="post"
            action="/uploads"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* PRODUCT NAME - Added white bg and shadow for depth */}
              <label className="flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-text focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Product Name
                </span>
                <input
                  type="text"
                  placeholder="Enter product name"
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 placeholder:text-slate-300 w-full font-medium"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* CATEGORY */}
              <label className="flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-pointer focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Category
                </span>
                <select
                  {...register("category", { required: true })}
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 cursor-pointer appearance-none w-full font-medium"
                >
                  <option>Select category</option>
                  <option>Electronics</option>
                  <option>Furniture</option>
                  <option>Fashion</option>
                  <option>Books</option>
                  <option>Sports</option>
                  <option>Other</option>
                </select>
                {errors.category && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* PRICE */}
              <label className="flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-text focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Price
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-base text-slate-400 font-semibold">
                    ₹
                  </span>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 w-full placeholder:text-slate-300 font-medium"
                    {...register("price", { required: true })}
                  />
                </div>
                {errors.price && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* CONTACT NUMBER */}
              <label className="flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-text focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Contact Number
                </span>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 placeholder:text-slate-300 w-full font-medium"
                  {...register("contact_number", { required: true })}
                />
                {errors.contact_number && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* ADDRESS */}
              <label className="md:col-span-2 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-text focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Address
                </span>
                <input
                  type="text"
                  placeholder="Full address"
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 placeholder:text-slate-300 w-full font-medium"
                  {...register("address", { required: true })}
                />
                {errors.address && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* DESCRIPTION */}
              <label className="md:col-span-2 flex flex-col bg-white border border-slate-200 rounded-2xl p-4 shadow-sm cursor-text focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-50 transition-all">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
                  Product Description
                </span>
                <textarea
                  placeholder="Tell us about the product..."
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 p-0 text-base text-slate-700 h-28 resize-none mt-1 placeholder:text-slate-300 w-full font-medium"
                  {...register("description", { required: true })}
                />
                {errors.description && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </label>

              {/* FILE UPLOAD */}
              <div className="md:col-span-2">
                <label
                  htmlFor="file-upload"
                  className="flex items-center gap-4 border-2 border-dashed border-slate-200 rounded-2xl p-5 cursor-pointer bg-white shadow-sm hover:bg-slate-50 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-700">
                      Choose a file
                    </span>
                    <span
                      id="file-name"
                      className="text-xs text-slate-400 font-medium"
                    >
                      {fileName}
                    </span>
                  </div>
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    {...imageRegister}
                    onChange={(e) => {
                      imageRegister.onChange(e);
                      setFileName(
                        e.target.files?.[0]?.name || "No file chosen",
                      );
                    }}
                  />
                  {errors.image && (
                    <span className="text-sm text-red-500">
                      This field is required
                    </span>
                  )}
                </label>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="modal-action mt-10 flex gap-3">
              <button
                type="button"
                onClick={() => {
                  document.getElementById("upload_modal").close();
                  window.location.reload();
                }}
                className="btn bg-white border border-slate-200 px-8 text-slate-600 hover:bg-slate-100 rounded-xl shadow-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 border-none text-white px-10 rounded-xl shadow-md shadow-indigo-200"
              >
                Upload now
              </button>
            </div>
          </form>
        </div>

        <form
          method="dialog"
          className="modal-backdrop bg-slate-900/40 backdrop-blur-sm"
        >
          <button></button>
        </form>
      </dialog>
      <Footer />
    </>
  );
}

export default Products;

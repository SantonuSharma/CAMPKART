import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
const API = import.meta.env.VITE_API_URL;

// ─────────────────────────────────────────────
// MY PRODUCT CARD
// This card is meant for the product OWNER.
// It shows all product details + a Delete button
// that removes the product from the database.
//
// Props:
//   item      → the product object from MongoDB
//   onDelete  → a function passed from the parent to remove
//               this card from the screen after deletion
// ─────────────────────────────────────────────
function MyProductCard({ item, onDelete }) {
  const [imgError, setImgError] = useState(false);

  // Format price in Indian style: 150000 → "1,50,000"
  function formatPrice(price) {
    if (price == null) return "—";
    return Number(price).toLocaleString("en-IN");
  }

  // Called when the user clicks "Delete" and then confirms
  async function handleDelete() {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/product/${item._id}`);

      if (onDelete) {
        onDelete(item._id);
        toast.success("Deleted Succesfully");
      }
    } catch (error) {
      console.log("Delete failed:", error);

      toast.error("Something went wrong.");
    }
  }

  return (
    <div className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* ── Product Image ── */}
      <figure className="relative h-44 bg-base-200 overflow-hidden">
        {!imgError ? (
          <img
            className="w-full h-full object-cover"
            src={item.image}
            alt={item.name}
            onError={() => setImgError(true)}
          />
        ) : (
          // Fallback if image URL is broken
          <div className="w-full h-full flex items-center justify-center text-base-content/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Category badge overlaid on image */}
        {item.category && (
          <span className="absolute top-2 left-2 badge badge-primary badge-sm">
            {item.category}
          </span>
        )}
      </figure>

      {/* ── Card Body ── */}
      <div className="card-body p-4 gap-2">
        {/* Product name + seller */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-bold text-base leading-tight line-clamp-1 flex-1">
            {item.name || "Unnamed Product"}
          </h2>
          <span className="badge badge-secondary badge-sm shrink-0">
            @{item.username}
          </span>
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-base-content/60 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Address */}
        {item.address && (
          <p className="text-xs text-base-content/50 truncate">
            📍 {item.address}
          </p>
        )}

        {/* Contact */}
        {item.contact_number && (
          <p className="text-xs text-base-content/50">
            📞 {item.contact_number}
          </p>
        )}

        {/* Price */}
        <p className="text-lg font-bold mt-1">
          <span className="text-red-500 text-sm">₹</span>
          {formatPrice(item.price)}
        </p>

        {/* ── Delete Section ── */}
        <button
          className="btn btn-error btn-sm w-full mt-3"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MyProductCard;

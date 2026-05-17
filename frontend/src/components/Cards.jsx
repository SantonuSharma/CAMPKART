import React, { useState, useEffect } from "react";

// ─────────────────────────────────────────────
// How long a product lives before MongoDB deletes it.
// This matches "expires: 2592000" in your Mongoose schema (30 days in seconds).
// If you change it in the schema, change it here too!
// ─────────────────────────────────────────────
const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000; // 30 days converted to milliseconds

// ─────────────────────────────────────────────
// COUNTDOWN COMPONENT
// Takes the product's createdAt date and counts down to when it expires.
// ─────────────────────────────────────────────
function Countdown({ createdAt }) {
  // Calculate how much time is left RIGHT NOW
  function getTimeLeft() {
    const createdTime = new Date(createdAt).getTime(); // when it was created (ms)
    const expiresAt = createdTime + THIRTY_DAYS_IN_MS; // when it will be deleted (ms)
    const now = Date.now(); // current time (ms)
    const diff = expiresAt - now; // milliseconds remaining

    // If time is already up, return null
    if (diff <= 0) return null;

    // Break the remaining ms into days / hours / minutes / seconds
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days, hours, minutes, seconds };
  }

  // Store the time left in state so React re-renders every second
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  // useEffect runs after render. Here we set up a 1-second interval
  // that updates the countdown every second.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    // Cleanup: stop the interval when this card is removed from the screen
    return () => clearInterval(timer);
  }, [createdAt]);

  // ── If expired ──
  if (!timeLeft) {
    return <span className="text-xs text-error font-semibold">⏰ Expired</span>;
  }

  // ── Choose a color based on how much time is left ──
  // Under 3 days  → red (urgent)
  // Under 10 days → orange (warning)
  // Otherwise     → green (plenty of time)
  let colorClass = "text-success";
  if (timeLeft.days < 3) colorClass = "text-error";
  else if (timeLeft.days < 10) colorClass = "text-warning";

  // ── Build the display string ──
  // If more than 1 day left  → show "Xd Xh Xm"
  // If less than 1 day left  → show "HH:MM:SS" (more urgent)
  let display;
  if (timeLeft.days >= 1) {
    display = `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m`;
  } else {
    // padStart(2, "0") adds a leading zero so "5" becomes "05"
    const hh = String(timeLeft.hours).padStart(2, "0");
    const mm = String(timeLeft.minutes).padStart(2, "0");
    const ss = String(timeLeft.seconds).padStart(2, "0");
    display = `${hh}:${mm}:${ss}`;
  }

  return (
    <span className={`text-xs font-mono font-semibold ${colorClass}`}>
      ⏳ {display}
    </span>
  );
}

// ─────────────────────────────────────────────
// CARDS COMPONENT
// Displays one product. Receives "item" as a prop from Products.jsx.
// ─────────────────────────────────────────────
function Cards({ item }) {
  // Track whether the product image failed to load
  const [imgError, setImgError] = useState(false);

  // Format the price in Indian style: 150000 → "1,50,000"
  function formatPrice(price) {
    if (price == null) return "—";
    return Number(price).toLocaleString("en-IN");
  }

  return (
    <div className="card bg-base-100 shadow-md border border-base-200 hover:shadow-lg transition-shadow duration-200 overflow-hidden">
      {/* ── Product Image ── */}
      <figure className="relative h-44 bg-base-200 overflow-hidden">
        {/* Show image if loaded OK, otherwise show a placeholder icon */}
        {!imgError ? (
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:4001/uploads/${item.image}`}
            alt={item.name}
            onError={() => setImgError(true)} // called if image URL is broken
          />
        ) : (
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

        {/* Category badge on top of image — only shown if category exists */}
        {item.category && (
          <span className="absolute top-2 left-2 badge badge-primary badge-sm">
            {item.category}
          </span>
        )}
      </figure>

      {/* ── Card Body ── */}
      <div className="card-body p-4 gap-2">
        {/* Product name + seller username side by side */}
        <div className="flex items-start justify-between gap-2">
          <h2 className="font-bold text-base leading-tight line-clamp-1 flex-1">
            {item.name || "Unnamed Product"}
          </h2>
          <span className="badge badge-secondary badge-sm shrink-0">
            @{item.username}
          </span>
        </div>

        {/* Description — only shown if it exists */}
        {item.description && (
          <p className="text-sm text-base-content/60 line-clamp-2">
            {item.description}
          </p>
        )}

        {/* Address — only shown if it exists */}
        {item.address && (
          <p className="text-xs text-base-content/50 truncate">
            📍 {item.address}
          </p>
        )}

        {/* Contact number — only shown if it exists, tappable on mobile */}
        {item.contact_number && (
          <p className="text-xs text-base-content/50">
            📞{" "}
            <a
              href={`tel:${item.contact_number}`}
              className="hover:text-primary"
            >
              {item.contact_number}
            </a>
          </p>
        )}

        {/* ── Price and Countdown on the same row ── */}
        <div className="flex items-center justify-between mt-1">
          {/* Price */}
          <span className="text-lg font-bold">
            <span className="text-red-500 text-sm">₹</span>
            {formatPrice(item.price)}
          </span>

          {/* Countdown timer — only shown if createdAt exists */}
          {item.createdAt && <Countdown createdAt={item.createdAt} />}
        </div>
      </div>
    </div>
  );
}

export default Cards;

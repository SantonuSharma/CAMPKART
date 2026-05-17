import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import Login from "./Login";
import { useAuth } from "../context/AuthProvider";
import Logout from "./Logout";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [sticky, setSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 0 ? setSticky(true) : setSticky(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = (
    <>
      <li>
        <Link
          to="/"
          className="text-gray-800 whitespace-nowrap no-underline active:text-white"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          to="/product"
          className="text-gray-800 whitespace-nowrap no-underline active:text-white"
        >
          Product
        </Link>
      </li>
      <li>
        <Link
          to="/mylistings"
          className="text-gray-800 whitespace-nowrap no-underline"
        >
          My Listings
        </Link>
      </li>
    </>
  );
  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-slate-50 shadow-sm ${sticky ? "sticky-navbar shadow-md bg-base-200 duration-100 transition-all ease-in-out" : ""}`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-20">
          <div className="navbar">
            <div className="navbar-start">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost xl:hidden"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h8m-8 6h16"
                    />{" "}
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  {navItems}
                </ul>
              </div>
              <div className="flex items-center gap-2 text-2xl font-bold cursor-pointer">
                <img className="w-12" src=".././public/CampkartLogo.png" alt=""/>
                <h4>CAMP<span className="text-rose-700">KART</span></h4>
              </div>
            </div>
            <div className="navbar-end flex items-center gap-2 flex-nowrap">
              <div className="hidden xl:flex">
                <ul className="menu menu-horizontal px-1 flex-nowrap">
                  {navItems}
                </ul>
              </div>
              <div className="hidden md:flex flex-shrink min-w-0">
                <label className="input focus-within:outline-none">
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.3-4.3"></path>
                    </g>
                  </svg>
                  <input
                    type="search"
                    className="grow focus:outline-none bg-transparent"
                    required
                    placeholder="Search"
                  />
                </label>
              </div>
              <div>
                <label className="swap swap-rotate">
                  {/* this hidden checkbox controls the state */}
                  <input
                    type="checkbox"
                    className="theme-controller"
                    value="synthwave"
                  />

                  {/* sun icon */}
                  <svg
                    className="swap-off h-7 w-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                  </svg>

                  {/* moon icon */}
                  <svg
                    className="swap-on h-7 w-7 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                  </svg>
                </label>
              </div>
              <div>
                {authUser ? (
                  <Logout />
                ) : (
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="btn bg-slate-700 text-white px-3 py-2 rounded-md duration-300 cursor-pointer whitespace-nowrap text-sm"
                  >
                    Login
                  </button>
                )}
                <Login />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;

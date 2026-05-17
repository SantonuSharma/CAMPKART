import React from "react";
import bags from "../../public/banner.svg";
import { PiHandWavingFill } from "react-icons/pi";
import { useAuth } from "../context/AuthProvider";

function Banner() {
  const [authUser] = useAuth();

  return (
    <>
      <div className="max-w-screen-2xl mx-auto p-4 md:px-20 flex flex-col md:flex-row my-20">
        {/* Left Section */}
        <div className="order-2 md:order-1 w-full md:w-1/2 mt-12 md:mt-32">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold">
              Your Campus{" "}
              <span className="text-pink-500">Your Marketplace!!!</span>
            </h1>

            <p className="text-xl text-gray-500">
              Buy, sell, and connect with students around you — simple, fast,
              and trusted.
            </p>

            {/* Email Input */}
            <label className="w-full input validator border rounded-md outline-none">
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
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              <input type="email" placeholder="mail@site.com" required />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>
          </div>

          <button className="mt-6 btn btn-secondary">Get Started</button>

          {/* 3D Hover Card */}
          <a
            href="#"
            className="hover-3d my-12 ml-20 cursor-pointer no-underline block"
          >
            <div className="card w-96 bg-pink-900 text-white">
              <div className="card-body">
                <div className="flex justify-between mb-10">
                  <div className="font-bold">CAMPKART</div>
                  <div className="text-5xl opacity-35"></div>
                </div>
                <div className="text-lg mb-4 opacity-40">
                  S T U D E N T &nbsp; A C C E S S
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-xs opacity-20">CARD HOLDER</div>
                    <div className="uppercase">{authUser ? authUser.username : "CAMPUS MEMBER"}</div>
                  </div>
                  <div>
                    <div className="text-xs opacity-20">JUST</div>
                    <div>BUY/SELL</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Required empty divs for 3D hover effect */}
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </a>
        </div>

        {/* Right Section - Illustration */}
        <div className="order-1 md:order-2 w-full md:w-1/2">
          <img src={bags} alt="Campus Marketplace" />
        </div>
      </div>
    </>
  );
}

export default Banner;

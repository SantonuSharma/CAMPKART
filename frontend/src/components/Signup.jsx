import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const userInfo = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    await axios
      .post("http://localhost:4001/user/signup", userInfo)
      .then((res) => {
        console.log(res.data);
        if (res.data) {
          toast.success('Signup successfully!"');
          navigate("/");
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
        localStorage.setItem("User", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          toast.error("Error: " + err.response.data.message);
        }
      });
  };
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <div className="modal modal-open ">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 no-underline"
              >
                ✕
              </Link>
              <h3 className="font-bold text-lg">Signup!</h3>
              <div className="flex flex-col mt-4 space-y-2">
                <span>Name</span>
                <input
                  className=" input outline-none focus:border-blue-200"
                  type="name"
                  placeholder="Enter your fullname"
                  {...register("username", { required: true })}
                />
                {errors.username && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
                <span>Email</span>
                <input
                  className=" input outline-none focus:border-blue-200"
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
                <span>Password</span>
                <input
                  className=" input outline-none focus:border-blue-200"
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>
              <div className="flex justify-around mt-4">
                <button className="btn bg-pink-500 text-white rounded-mdpx-3 py-1 hover:bg-pink-700 duration-200">
                  Signup
                </button>
                <p>
                  Have account?{" "}
                  <span
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>
            </form>
          </div>
          <Login />
        </div>
      </div>
    </>
  );
}

export default Signup;

import React from "react";
import { useAuth } from "../context/AuthProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    try {
      setAuthUser({
        ...authUser,
        user: null,
      });
      localStorage.removeItem("User");
      navigate("/");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
      toast.success("Logout successfully");
    } catch (error) {
      toast.error("Error :" + error.message);
    }
  };
  return (
    <div>
      <button
        onClick={handleLogout}
        className="btn bg-red-500 text-white px-3 py-2 rounded-md duration-300 cursor-pointer whitespace-nowrap text-sm"
      >
        Logout
      </button>
    </div>
  );
}

export default Logout;

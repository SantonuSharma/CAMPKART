import React from "react";
import Home from "./Home/Home";
import Product from "./Product/Product";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import MyListings from "./components/Mylistings";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mylistings"
          element={authUser ? <MyListings /> : <Navigate to="/signup" />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;

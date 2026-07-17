import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProducts";
import ProductDetails from "./pages/ProductDetails";
import EditProduct from "./pages/EditProduct";
import AdminProducts from "./pages/AdminProducts";

import { authContext } from "./context/AuthProvider";

const App = () => {
  const { user } = useContext(authContext);

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {user?.role === "Admin" ? (
        <div className="flex">

          <AdminNavbar />

          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/adminProducts" element={<AdminProducts />} />
          <Route path="/edit/:id" element={<EditProduct />} />
          <Route path="/add" element={<AddProduct />} />
            </Routes>
          </div>

        </div>
      ) : (
        <>
          <Navbar />

          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/editProfile" element={<EditProfile />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </>
      )}

    </div>
  );
};

export default App;
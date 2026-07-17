import React, { useContext } from "react";
import {
  FaTachometerAlt,
  FaBoxOpen,
  FaUsers,
  FaShoppingCart,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";

const AdminNavbar = () => {
  const menu = [
    {
      title: "Dashboard",
      icon: <FaTachometerAlt />,
      path: "/admin/dashboard",
    },
    {
      title: "Products",
      icon: <FaBoxOpen />,
      path: "/adminProducts",
    },
    {
      title: "Orders",
      icon: <FaShoppingCart />,
      path: "/admin/orders",
    },
    {
      title: "Users",
      icon: <FaUsers />,
      path: "/admin/users",
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/admin/settings",
    },
  ];

  const {user,logout} = useContext(authContext)
  const navigate = useNavigate()

  const logoutHandler = async() =>{
    await logout()
    navigate("dashboard")
  }

  return (
    <div className="w-72 h-screen bg-slate-950 border-r border-slate-800 flex flex-col">

      {/* Logo */}

      <div className="px-8 py-7 border-b border-slate-800">

        <h1 className="text-3xl font-bold text-white">
          TechSphere
        </h1>

        <p className="text-slate-400 text-sm mt-1">
          Admin Panel
        </p>

      </div>

      {/* Menu */}

      <div className="flex-1 mt-8 px-4">

        {menu.map((item) => (
          <NavLink
            key={item.title}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-xl mb-3 transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`
            }
          >
            <span className="text-xl">{item.icon}</span>

            <span className="font-medium">
              {item.title}
            </span>
          </NavLink>
        ))}

      </div>

      {/* Bottom */}

      <div className="border-t border-slate-800 p-5">

        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white transition" 
        onClick={logoutHandler}>

          <FaSignOutAlt />

          Logout

        </button>

      </div>

    </div>
  );
};

export default AdminNavbar;
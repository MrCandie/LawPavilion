import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Toggle from "./Toggle";
import { logout } from "../auth";
import { toast } from "react-toastify";

export default function Wrapper({ children, title }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Reports", path: "/reports" },
    { name: "Settings", path: "/settings" },
  ];

  const handleLogout = () => {
    logout();
    localStorage.removeItem("user-profile");
    toast.success("Logged Out");
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 relative">
      {/* Sidebar (Desktop + Slide-in Mobile) */}
      <div
        className={`fixed z-40 top-0 left-0 h-full bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 md:w-64 w-64 flex flex-col`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className="font-bold text-lg">LawPavillon</span>
          <button
            className="md:hidden text-xl"
            onClick={() => setIsSidebarOpen(false)}>
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`
              }>
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded">
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden text-xl">
              ☰
            </button>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <Toggle />
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}

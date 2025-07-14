import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { getCurrentUser, updateUserProfile } from "../../auth";
import { toast } from "react-toastify";
import { ImSpinner10 } from "react-icons/im";
import Input from "../../components/Input";

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const user = getCurrentUser();

  const [theme, setTheme] = useState(
    () =>
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  // Set initial theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await updateUserProfile({
        displayName: formData.name,
        phoneNumber: formData.phoneNumber,
      });

      const user = getCurrentUser();
      localStorage.setItem(
        "user-profile",
        JSON.stringify({
          name: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
        })
      );
      toast.success("Profile updated");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "Profile update failed");
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const user = localStorage.getItem("user-profile");
    const parsedUser = user ? JSON.parse(user) : "";

    setFormData({
      name: parsedUser?.name,
      email: parsedUser?.email,
    });
  }, [user]);

  return (
    <Wrapper title="Settings">
      <div className="max-w-2xl mx-auto space-y-6 text-gray-900 dark:text-gray-100">
        <h2 className="text-2xl font-semibold">Settings</h2>

        {/* Profile Update Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow">
          <Input
            type="text"
            name="name"
            label="Full Name"
            required
            value={formData.name}
            handleChange={handleChange}
            placeholder="John Doe"
          />

          <Input
            type="email"
            name="email"
            label="Email Address"
            required
            value={formData.email}
            handleChange={handleChange}
            className="w-full px-4 py-2 rounded border dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
            placeholder="jane@example.com"
          />

          <button
            type="submit"
            className="px-4 flex items-center justify-center gap-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition">
            Update Profile{" "}
            {loading && (
              <span className="animate-spin">
                <ImSpinner10 />
              </span>
            )}
          </button>
        </form>

        {/* Theme Toggle */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h3 className="text-lg font-medium mb-2">Appearance</h3>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition">
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </div>
      </div>
    </Wrapper>
  );
}

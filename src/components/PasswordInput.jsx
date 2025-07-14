import React, { useState } from "react";

export default function PasswordInput({ value, handleChange }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-1 text-[#111] dark:text-white text-sm font-medium">
        Password
      </label>
      <div className="relative">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          name="password"
          required
          value={value}
          onChange={handleChange}
          className="w-full px-4 py-2 rounded border dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white pr-10"
          placeholder="••••••••"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-2 text-sm text-gray-600 dark:text-gray-400"
          onClick={() => setShowPassword((prev) => !prev)}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>
    </div>
  );
}

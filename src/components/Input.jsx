import React from "react";

export default function Input({
  value,
  handleChange,
  name,
  type,
  placeholder,
  label,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-[#111] dark:text-white mb-1 text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        type={type}
        name={name}
        required
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded border dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white"
        placeholder={placeholder}
      />
    </div>
  );
}

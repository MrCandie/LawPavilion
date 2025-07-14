import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthWrapper from "../../components/AuthWrapper";
import { toast } from "react-toastify";
import { getCurrentUser, register } from "../../auth";
import { ImSpinner10 } from "react-icons/im";
import Input from "../../components/Input";
import PasswordInput from "../../components/PasswordInput";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    if (!formData.email || !formData.password)
      return toast.warn("Email and password are required");
    try {
      e.preventDefault();
      setLoading(true);
      await register(formData.email, formData.password);
      const user = getCurrentUser();
      localStorage.setItem("auth_token", user.accessToken);
      localStorage.setItem(
        "user-profile",
        JSON.stringify({
          name: user?.displayName,
          email: user?.email,
          phoneNumber: user?.phoneNumber,
        })
      );
      toast.success("Sign up successful");
      navigate("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.message || "signup failed");
    }
  };

  return (
    <AuthWrapper title="Create an Account">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          name="email"
          label="Email Address"
          required
          value={formData.email}
          handleChange={handleChange}
          placeholder="jane@example.com"
        />

        <PasswordInput value={formData.password} handleChange={handleChange} />

        <button
          disabled={loading}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 rounded transition">
          Sign Up{" "}
          {loading && (
            <span className="animate-spin">
              <ImSpinner10 />
            </span>
          )}
        </button>
      </form>
      <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-orange-500 hover:underline">
          Log in
        </Link>
      </p>
    </AuthWrapper>
  );
}

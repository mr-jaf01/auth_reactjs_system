import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import GuestLayout from "../Layouts/GuestLayout";
import TextInput from "../../components/TextInput";
import Label from "../../components/label";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  // checking if the user is login and redirecting to homepage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setValidationErrors({});

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 422) {
          const errorData = await response.json();
          setValidationErrors(errorData.errors);
        } else {
          setErrorMessage("Invalid login credentials or an error occurred.");
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setFormData({ email: "", password: "" });
      navigate("/"); // Redirect to dashboard or home page
    } catch (error) {
      setErrorMessage("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestLayout>
      <h2 className="font-semibold text-lg text-purple-700 text-center">
        Login
      </h2>
      <form
        method="POST"
        className="flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <Label title="Email" />
          <TextInput
            type="email"
            name="email"
            placeholder="Enter Email"
            required={true}
            value={formData.email}
            onChange={handleChange}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-xs">{validationErrors.email[0]}</p>
          )}
        </div>

        <div>
          <Label title="Password" />
          <TextInput
            type="password"
            name="password"
            placeholder="Enter Password"
            required={true}
            value={formData.password}
            onChange={handleChange}
          />
          {validationErrors.password && (
            <p className="text-red-500 text-xs">
              {validationErrors.password[0]}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {errorMessage && (
            <p className="text-red-500 text-xs text-center">{errorMessage}</p>
          )}

          <p className="text-xs">
            <Link to="/forgot-password" className="text-purple-700 text-sm">
              Forgot Password ?
            </Link>
          </p>
          <div className="flex flex-row justify-end items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-2 w-full text-sm py-1 rounded-md text-white ${
                isSubmitting ? "bg-gray-500" : "bg-purple-700"
              }`}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
          <p className="text-xs">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-purple-700 text-sm">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Login;

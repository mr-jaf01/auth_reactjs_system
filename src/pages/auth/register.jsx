import React, { useState, useEffect } from "react";
import GuestLayout from "../Layouts/GuestLayout";
import TextInput from "../../components/TextInput";
import Label from "../../components/label";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

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
    setErrors({ ...errors, [name]: null }); // Clear field-specific error on change
  };

  const handleSubmit = async (e) => {
    //console.log(formData);
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage("");

    if (formData.password !== formData.cpassword) {
      setErrors({ cpassword: "Passwords do not match!" });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.status === 422) {
        const { errors: validationErrors } = await response.json();
        setErrors(validationErrors);
        throw new Error("Validation failed.");
      }

      if (!response.ok) {
        throw new Error("Registration failed. Please try again.");
      }

      const data = await response.json();

      //console.log(data);
      setSuccessMessage("Registration successful!");
      setFormData({
        name: "",
        email: "",
        password: "",
        cpassword: "",
      });
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        general: error.message || "Something went wrong.",
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <GuestLayout>
      <h2 className="font-semibold text-lg text-purple-700 text-center">
        Register
      </h2>
      <form
        method="POST"
        className="flex flex-col gap-1"
        onSubmit={handleSubmit}
      >
        <div>
          <Label title="Name" />
          <TextInput
            type="text"
            name="name"
            placeholder="Full name"
            required={true}
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div>
          <Label title="Email" />
          <TextInput
            type="email"
            name="email"
            placeholder="Email"
            required={true}
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
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
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>

        <div>
          <Label title="Confirm Password" />
          <TextInput
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            required={true}
            value={formData.cpassword}
            onChange={handleChange}
          />
          {errors.cpassword && (
            <p className="text-red-500 text-xs">{errors.cpassword}</p>
          )}
        </div>

        <div className="flex flex-col gap-6">
          {errors.general && (
            <p className="text-red-500 text-xs">{errors.general}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-xs">{successMessage}</p>
          )}

          <p className="text-xs">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-700 text-sm">
              Login here
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
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </div>
        </div>
      </form>
    </GuestLayout>
  );
};

export default Register;

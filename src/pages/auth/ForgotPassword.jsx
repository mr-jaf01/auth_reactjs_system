import React from "react";
import Label from "../../components/label";
import TextInput from "../../components/TextInput";
import GuestLayout from "../Layouts/GuestLayout";

const ForgotPassword = () => {
  return (
    <>
      <GuestLayout>
        <small>
          Forgot your password? No problem. Just let us know your email address
          and we will email you a password reset link that will allow you to
          choose a new one.
        </small>
        <form method="POST" className="flex flex-col gap-4 my-4">
          <div>
            <Label title="Email" />
            <TextInput
              type="email"
              name="email"
              placeholder="Enter Email"
              required={true}
            />
          </div>

          <button
            type="submit"
            className="w-full text-xs px-2  bg-purple-700 text-white py-2 rounded-md"
          >
            Email Password Reset Link
          </button>
        </form>
      </GuestLayout>
    </>
  );
};

export default ForgotPassword;

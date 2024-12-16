import React from "react";
import { children } from "react";
import { Link } from "react-router-dom";

const GuestLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-purple-700">
      <div className="flex flex-col gap-3 justify-center items-center">
        <Link to="/" className="font-bold text-2xl text-white">
          AR SHAKIR
        </Link>
      </div>

      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white  overflow-hidden sm:rounded-lg">
        {children}
      </div>
    </div>
  );
};

export default GuestLayout;

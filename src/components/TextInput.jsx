import React from "react";

const TextInput = ({ type, name, placeholder, value, onChange, required }) => {
  return (
    <input
      type={type || "text"}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="block my-2 p-2 w-full text-xs border rounded-md border-purple-400 focus:ring-purple-400 focus:border-purple-400 outline-purple-200"
    />
  );
};

export default TextInput;

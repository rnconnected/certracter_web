import React, { useState } from "react";
import "@/styles/customInput.css";

const CustomInput = ({ label, type, value, setValue, ...restProps }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className={"floating-label-input"}>
      <label>{label}</label>
      <input
        {...restProps}
        onChange={handleChange}
        className="customInput"
        type={type}
        value={value}
      />
    </div>
  );
};

export default CustomInput;

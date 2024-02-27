import React from "react";
import "@/styles/dropDown.css";
import Link from "next/link";

const Dropdown = ({ handlePopup }) => {
  return (
    <>
      <div className="dropDown_Cont">
        <Link href={"/about"} className="dropDown_link">
          About Us
        </Link>
        <Link href={"/signup"} className="dropDown_link">
          Create an account
        </Link>
        <div onClick={handlePopup} className="dropDown_link">
          Login
        </div>
        <Link href={"/#"} onClick={handlePopup} className="dropDown_link">
          Download App
        </Link>
      </div>
    </>
  );
};

export default Dropdown;

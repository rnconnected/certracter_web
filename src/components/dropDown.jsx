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
        <Link href={"#"} className="dropDown_link" onClick={handlePopup}>
          Create an account
        </Link>
        <div onClick={handlePopup} className="dropDown_link">
          Login
        </div>
        <Link
          href={"/#"}
          onClick={handlePopup}
          className="dropDown_link"
          id="download_btn_pop"
        >
          <span>Download App</span>
        </Link>
      </div>
    </>
  );
};

export default Dropdown;

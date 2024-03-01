import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Dropdown from "@/components/dropDown";
import "@/app/page.css";
import { useRouter } from "next/router";
import { constants } from "buffer";
// import Popup from "./popup";

const navbar = ({ showDropdown, setShowDropdown, handlePopup }) => {
  return (
    <>
      <div className="navbar">
        <Link href={"/"} className="h_logo">
          <Image
            src={"/images/h_logo.png"}
            alt="logo"
            height={500}
            width={500}
          />
        </Link>
        <div className="hamburger">
          {showDropdown ? (
            <Icon
              icon="material-symbols-light:cancel-outline"
              onClick={() => setShowDropdown(false)}
            />
          ) : (
            <Icon
              icon="solar:hamburger-menu-outline"
              onClick={() => setShowDropdown(true)}
            />
          )}
        </div>
        {showDropdown && <Dropdown handlePopup={handlePopup} />}
        <div className="navbar_right">
          <Link href={"/about"} id="about_btn">
            About Us
          </Link>
          <Link href={"#"} id="signup_btn" onClick={handlePopup}>
            Create an account
          </Link>
          <Link href={"#"} id="signin_btn" onClick={handlePopup}>
            Login
          </Link>
          <Link href={"#"} id="download_btn" onClick={handlePopup}>
            Download App
          </Link>
        </div>
      </div>
    </>
  );
};

export default navbar;

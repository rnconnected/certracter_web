"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/header.css";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";

const LogoutandProfile = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push("/signin");
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <>
      <div className="logoutAndProfileCont">
        <Link href={"/profile"} className="profileLink">
          <span>
            <Icon icon="bxs:user" />
          </span>
          <span>Profile</span>
        </Link>
        <div className="signoutBtn" onClick={handleLogout}>
          <span>
            <Icon icon="tabler:logout" />
          </span>
          <span>Sign out</span>
        </div>
      </div>
    </>
  );
};

const Header = () => {
  const [active, setActive] = useState(false);
  const headerRef = useRef(null);

  const handleActive = () => {
    setActive((prevActive) => !prevActive);
  };

  const handleClickOutside = (event) => {
    if (headerRef.current && !headerRef.current.contains(event.target)) {
      setActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="header-home" ref={headerRef}>
        <div className="logoCont-home">
          <Image
            src={"/logoAndtxt.png"}
            alt="logo"
            height={500}
            width={500}
            className="homeLogo"
            priority
          />
        </div>
        <div className="headerIcons">
          <span className="h-icon">
            <Icon icon="mingcute:notification-fill" />
          </span>
          <span className="h-icon">
            <Link href={"/settings"}>
              <Icon icon="material-symbols-light:settings" />
            </Link>
          </span>
          <span className="h-icon">
            <Icon icon="material-symbols-light:delete" />
          </span>

          <span
            onClick={handleActive}
            className={`registerIcons ${active ? "active" : ""}`}
          >
            <Icon icon="mingcute:user-4-fill" />
            <Icon icon="mingcute:down-line" fontSize={18} />
            <LogoutandProfile />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;

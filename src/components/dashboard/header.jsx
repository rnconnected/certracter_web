"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/header.css";
import Link from "next/link";

const LogoutandProfile = ({ handleSignOut }) => {
  return (
    <>
      <div className="logoutAndProfileCont ">
        <Link href={"/profile"} className="profileLink">
          <span>
            <Icon icon="bxs:user" />
          </span>
          <span>Profile</span>
        </Link>
        <div
          className="signoutBtn"
          onClick={() => {
            handleSignOut();
            sessionStorage.clear();
          }}
        >
          <span>
            <Icon icon="tabler:logout" />
          </span>
          <span>Sign out</span>
        </div>
      </div>
    </>
  );
};

const Header = ({ handleSignOut }) => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    !active ? setActive(true) : setActive(false);
  };
  return (
    <>
      <div className="header-home ">
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
          <span>
            <Icon icon="mingcute:notification-fill" />
          </span>
          <span>
            <Icon icon="material-symbols-light:settings" />
          </span>
          <span>
            <Icon icon="material-symbols-light:delete" />
          </span>
          <span
            onClick={handleActive}
            className={`registerIcons ${active ? "active" : null}`}
          >
            <Icon icon="mingcute:user-4-fill" />
            <Icon icon="mingcute:down-line" fontSize={18} />
            <LogoutandProfile handleSignOut={handleSignOut} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;

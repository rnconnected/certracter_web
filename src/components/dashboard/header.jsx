"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/header.css";

const Header = () => {
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
            <Icon icon="ri:delete-bin-6-fill" />
          </span>
          <span className="registerIcons">
            <Icon icon="mingcute:user-4-fill" />
            <Icon icon="mingcute:down-line" fontSize={18} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Header;

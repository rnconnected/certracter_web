"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import CertTray from "@/components/dashboard/cert_tray";
import "@/styles/dashboard/home.css";
import { Icon } from "@iconify/react";
import data from "@/app/db";
import CardComponent from "@/components/dashboard/certCards";

const Home = () => {
  const allNamesAndCategories = data.flatMap((category) =>
    category.map((credential) => ({
      name: credential.name,
      category: credential.category,
    }))
  );
  return (
    <>
      <Header />
      <CertTray />
      <div className="welcomeMsg">Welcome Devin👋</div>
      <div className="searchCont">
        <div className="searchBar">
          <Icon icon="ic:baseline-search" width="22" />
          <input
            type="search"
            className="searchInput"
            placeholder="Search for credential"
          />
        </div>
      </div>

      {/* this is the data displayed section */}
      <div className="licenseArray_Cont">
        <span className="certEmptyMsg">you have not added any credential</span>
        {/* data */}
        {allNamesAndCategories.map((item, index) => {
          return (
            <CardComponent
              key={index}
              name={item.name}
              category={item.category}
            />
          );
        })}
      </div>
      <div className="floatbtn">
        <Icon icon="ic:round-plus" />
      </div>
    </>
  );
};

export default Home;

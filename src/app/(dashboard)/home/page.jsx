"use client";
import React, { useState } from "react";
import Header from "@/components/dashboard/header";
import CertTray from "@/components/dashboard/cert_tray";
import "@/styles/dashboard/home.css";
import { Icon } from "@iconify/react";
import data from "@/app/db";
import CardComponent from "@/components/dashboard/certCards";
import SelectCard from "@/components/dashboard/selectCard";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/config";
import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const Home = () => {
  const [selectCardActive, setSelectCardAdctive] = useState(false);
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/signin");
    },
  });


  const allNamesAndCategories = data.flatMap((category) =>
    category.map((credential) => ({
      name: credential.name,
      category: credential.category,
      expiryDate: credential.expiryDate,
    }))
  );

  const handleSelectCard = () => {
    !selectCardActive
      ? setSelectCardAdctive(true)
      : setSelectCardAdctive(false);
  };

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <>
      <Header handleSignOut={handleSignOut} />
      <CertTray />
      <div className="welcomeMsg">Welcome {session?.data?.user?.email}👋</div>
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
        {data == null ? (
          <span className="certEmptyMsg">
            you have not added any credential
          </span>
        ) : (
          allNamesAndCategories.map((item, index) => {
            return (
              <CardComponent
                key={index}
                name={item.name}
                category={item.category}
                expiryDate={item.expiryDate}
              />
            );
          })
        )}
      </div>
      {selectCardActive ? (
        <SelectCard handleSelectCard={handleSelectCard} />
      ) : null}
      <div className="floatbtn" onClick={handleSelectCard}>
        <Icon icon="ic:round-plus" />
      </div>
    </>
  );
};

export default Home;

"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import CertTray from "@/components/dashboard/cert_tray";
import "@/styles/dashboard/home.css";
import { Icon } from "@iconify/react";
import data from "@/app/db";
import CardComponent from "@/components/dashboard/certCards";
import SelectCard from "@/components/dashboard/selectCard";
import { parseCookies } from "nookies";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";

const Home = () => {
  const [selectCardActive, setSelectCardAdctive] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();

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

  useEffect(() => {
    const { token } = parseCookies();

    if (!user && !loading) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Header />
      <CertTray />
      <div className="welcomeMsg">
        Welcome {user?.displayName.split(" ")[1]}👋
      </div>
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

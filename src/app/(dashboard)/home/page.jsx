"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import CertTray from "@/components/dashboard/cert_tray";
import "@/styles/dashboard/home.css";
import { Icon } from "@iconify/react";
import CardComponent from "@/components/dashboard/certCards";
import SelectCard from "@/components/dashboard/selectCard";
import { parseCookies } from "nookies";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { firestore } from "@/app/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const Home = () => {
  const [selectCardActive, setSelectCardActive] = useState(false);
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const [userDocs, setUserDocs] = useState(null);

  const handleSelectCard = () => {
    setSelectCardActive(!selectCardActive);
  };

  useEffect(() => {
    const { token } = parseCookies();

    if (!user && !loading) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!user) return;
        const userId = user.uid;
        const collections = [
          "Certification",
          "CEU",
          "License",
          "Education",
          "Others",
          "Travel",
          "Vaccination",
        ];
        const promises = collections.map(async (collectionName) => {
          const q = query(
            collection(firestore, collectionName),
            where("userId", "==", userId)
          );
          const querySnapshot = await getDocs(q);
          return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            collection: collectionName,
            ...doc.data(),
          }));
        });
        const userData = await Promise.all(promises);
        setUserDocs(userData.flat());
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

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
        Welcome {user.displayName.split(" ")[0]} 👋
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

      <div className="licenseArray_Cont">
        {userDocs === null ? (
          <span className="certEmptyMsg">
            You have not added any credentials.
          </span>
        ) : (
          userDocs.map((data) => (
            <CardComponent
              key={data.id}
              {...data}
              collectionName={data.collection}
            />
          ))
        )}
      </div>

      {selectCardActive && <SelectCard handleSelectCard={handleSelectCard} />}

      <div className="floatbtn" onClick={handleSelectCard}>
        <Icon icon="ic:round-plus" />
      </div>
    </>
  );
};

export default Home;

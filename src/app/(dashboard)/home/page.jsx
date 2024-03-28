"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import CertTray from "@/components/dashboard/cert_tray";
import "@/styles/dashboard/home.css";
import { Icon } from "@iconify/react";
import CardComponent from "@/components/dashboard/certCards";
import SelectCard from "@/components/dashboard/selectCard";
import { useQuery, QueryClient, QueryClientProvider } from "react-query";
import { firestore } from "@/app/firebase/config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

const Home = () => {
  const [selectCardActive, setSelectCardActive] = useState(false);
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  const {
    data: userDocs,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["userDocs", selectedCollection],
    async () => {
      if (!user) return [];

      try {
        const userId = user.uid;
        let collections = [
          "Certification",
          "CEU",
          "License",
          "Education",
          "Others",
          "Travel",
          "Vaccination",
        ];

        if (selectedCollection) {
          collections = [selectedCollection];
        }

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
        return userData.flat();
      } catch (error) {
        console.error("Error fetching user data:", error);
        throw new Error("Error fetching user data");
      }
    },
    { enabled: !!user }
  );

  // this is the delete document function
  const deleteDocument = async (collectionName, documentId) => {
    try {
      const documentRef = doc(firestore, collectionName, documentId);
      await deleteDoc(documentRef);
      await refetch();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  const handleSelectCard = () => {
    setSelectCardActive(!selectCardActive);
  };

  // Function to handle search term change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  const filteredUserDocs =
    userDocs &&
    userDocs.filter((doc) =>
      doc.Title.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    user && (
      <>
        <Header />
        <CertTray
          setSelectedCollection={setSelectedCollection}
          selectedCollection={selectedCollection}
        />
        {user && (
          <div className="welcomeMsg">
            Welcome {user.displayName.split(" ")[0]} 👋
          </div>
        )}

        <div className="searchCont">
          <div className="searchBar">
            <Icon icon="ic:baseline-search" width="22" />
            <input
              type="search"
              className="searchInput"
              placeholder="Search for credential"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="licenseArray_Cont">
          {filteredUserDocs === undefined ? (
            <Loading />
          ) : filteredUserDocs.length === 0 ? (
            <span className="certEmptyMsg">
              No credentials found matching the search.
            </span>
          ) : (
            filteredUserDocs.map((data, index) => {
              return (
                <Link
                  key={index}
                  href={`/view_details/:${data.collection}:${data.id}`}
                  className="viewCard"
                  onClick={(e) => {
                    if (
                      e.target.tagName === "SPAN" ||
                      e.target.tagName === "svg" ||
                      e.target.tagName === "path"
                    ) {
                      e.preventDefault();
                    }
                  }}
                >
                  <CardComponent
                    key={data.id}
                    {...data}
                    collectionName={data.collection}
                    docId={data.id}
                    deleteDocument={deleteDocument}
                  />
                </Link>
              );
            })
          )}
        </div>

        {selectCardActive && <SelectCard handleSelectCard={handleSelectCard} />}

        <div className="floatbtn" onClick={handleSelectCard}>
          <Icon icon="ic:round-plus" />
        </div>
      </>
    )
  );
};

const queryClient = new QueryClient();

const HomeWithQueryClientProvider = () => (
  <QueryClientProvider client={queryClient}>
    <Home />
  </QueryClientProvider>
);

export default HomeWithQueryClientProvider;

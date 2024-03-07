"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import Link from "next/link";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/viewCert.css";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAuth } from "@/app/hooks/useAuth";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from "@/app/firebase/config";

const ViewCert = () => {
  const [documentData, setDocumentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { collection, id } = router.query;

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        if (!collection || !id) return;

        setLoading(true);

        const docRef = doc(firestore, collection, id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setDocumentData({ id: docSnapshot.id, ...docSnapshot.data() });
        } else {
          console.error("Document not found.");
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching document data:", error);
        setLoading(false);
      }
    };

    fetchDocumentData();
  }, [collection, id]);

  return (
    <>
      <Header />
      <div className="viewHeader">
        <Link href={"/home"} className="goBack_btn">
          <Icon icon="pajamas:arrow-left" />
          <div className="goBack_txt">Back</div>
        </Link>

        <div className="actionIcons">
          <div className="actionIcon edit">
            <Icon icon="akar-icons:pencil" />
            {"Edit"}
          </div>
          <div className="actionIcon share">
            <Icon icon="tdesign:share" />
            {"Share"}
          </div>
          <div className="actionIcon delete">
            <Icon icon="tabler:trash" />
            {"Delete"}
          </div>
        </div>
      </div>
      {/* this is the end of the header */}

      <div className="viewCard-cont">
        <div className="viewCertCard">
          <div className="viewCertCard_header">
            <div className="glass_viewCert">
              <div className="viewCert_name">{"Certificate Name"}</div>
              <div className="viewCert_subtitle">Certificate</div>
            </div>
          </div>
          <section className="viewCert_info">
            <div className="infoSect">
              <div className="title">Credential Record Number</div>
              <div className="value">{"12345632323"}</div>
            </div>
          </section>
          <section className="viewCert_info">
            <div className="infoSect">
              <div className="title">Issue Date</div>
              <div className="value">{"12/03/2023"}</div>
            </div>
            <div className="infoSect">
              <div className="title">Expiration Date</div>
              <div className="value">{"12/03/2023"}</div>
            </div>
          </section>
          <section className="viewCert_info">
            <div className="infoSect">
              <div className="title">Issue Date</div>
              <div className="value">{"12/03/2023"}</div>
            </div>
            <div className="infoSect">
              <div className="title">Expiration Date</div>
              <div className="value">{"12/03/2023"}</div>
            </div>
            <div className="infoSect">
              <div className="title">Expiration Date</div>
              <div className="value">{"12/03/2023"}</div>
            </div>
          </section>
          <section className="certImage_section">
            <div className="Certimg">
              <div className="f-or-b">Front Image</div>
              <div className="certImg_cont">
                <Image
                  src={"images/nullimg.svg"}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="certImg_img"
                />
              </div>
            </div>
            {/*  */}
            <div className="Certimg">
              <div className="f-or-b">Back Image</div>
              <div className="certImg_cont">
                <Image
                  src={"images/nullimg.svg"}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="certImg_img"
                />
              </div>
            </div>
          </section>

          <div className="Privatenote">
            <div className="title">Private Note</div>
            <div className="value">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
              voluptates corrupt.
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewCert;

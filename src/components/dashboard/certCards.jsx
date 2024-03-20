/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/styles/dashboard/certCards.css";
import { Icon } from "@iconify/react";
import Link from "next/link";
import CertData from "@/app/(dashboard)/certData";

const CardComponent = ({
  Title,
  category,
  expiryDate,
  certificationExpiryDate,
  licenseExpiryDate,
  collectionName,
  userId,
  docId,
  deleteDocument,
}) => {
  const dateData = new Date(expiryDate);
  const dateData2 = new Date(certificationExpiryDate);
  const dateData3 = new Date(licenseExpiryDate);
  const today = new Date();
  const timeDiff1 = dateData - today;
  const timeDiff2 = dateData2 - today;
  const timeDiff3 = dateData3 - today;

  const daysLeft1 = Math.ceil(timeDiff1 / (1000 * 60 * 60 * 24));
  const daysLeft2 = Math.ceil(timeDiff2 / (1000 * 60 * 60 * 24));
  const daysLeft3 = Math.ceil(timeDiff3 / (1000 * 60 * 60 * 24));

  // const handleViewCert = () => {};

  return (
    <div className="viewCard">
      <div className={`viewCard_card ${collectionName}`}>
        <div className="viewCard_left">
          <div className={`viewCard_imgCont ${collectionName}`}>
            <Image
              src={`/images/${collectionName}.png`}
              alt={"image error"}
              height={100}
              width={100}
              className="viewCard_img"
            />
          </div>
          <div className="viewCard_info">
            <div className="h1">{Title}</div>
            <div>{collectionName}</div>
          </div>
        </div>
        <div className="viewCard_right">
          <div className="VR_Icons">
            <span>
              <Icon icon="solar:share-outline" />
            </span>
            <span
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Are you sure you want to delete this document permanently?"
                );
                if (isConfirmed) deleteDocument(collectionName, docId);
              }}
            >
              <Icon icon="material-symbols-light:delete" />
            </span>
          </div>
          {expiryDate != null ? (
            <div className="expiryTime">
              {daysLeft1 <= 0 ? "Expired" : "Expires in " + daysLeft1 + " days"}
            </div>
          ) : null}
          {certificationExpiryDate != null ? (
            <div className="expiryTime">
              {daysLeft2 <= 0 ? "Expired" : "Expires in " + daysLeft2 + " days"}
            </div>
          ) : null}
          {licenseExpiryDate != null ? (
            <div className="expiryTime">
              {daysLeft3 <= 0 ? "Expired" : "Expires in " + daysLeft3 + " days"}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

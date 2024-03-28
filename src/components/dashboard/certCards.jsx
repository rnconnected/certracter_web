/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/styles/dashboard/certCards.css";
import { Icon } from "@iconify/react";
import Link from "next/link";

const CardComponent = ({
  Title,
  category,
  expiryDate,
  ExpiryDate,
  collectionName,
  userId,
  docId,
  deleteDocument,
}) => {
  const dateData = new Date(expiryDate);
  const dateData2 = new Date(ExpiryDate);
  const today = new Date();
  const timeDiff1 = dateData - today;
  const timeDiff2 = dateData2 - today;
  const daysLeft1 = Math.ceil(timeDiff1 / (1000 * 60 * 60 * 24));
  const daysLeft2 = Math.ceil(timeDiff2 / (1000 * 60 * 60 * 24));

  function calculateExpiryText(daysLeft) {
    if (daysLeft >= 365) {
      const years = Math.floor(daysLeft / 365);
      return `Expires in ${years} year${years !== 1 ? "s" : ""}`;
    } else if (daysLeft >= 30) {
      const months = Math.floor(daysLeft / 30);
      return `Expires in ${months} month${months !== 1 ? "s" : ""}`;
    } else if (daysLeft >= 7) {
      const weeks = Math.floor(daysLeft / 7);
      return `Expires in ${weeks} week${weeks !== 1 ? "s" : ""}`;
    } else if (daysLeft > 0) {
      return `Expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`;
    } else {
      return "Expired";
    }
  }

  return (
    <>
      {/* <input type="checkbox" id="" /> */}
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
            <span title="Share document" className="spanBtn">
              <Icon icon="solar:share-outline" className="spanBtn" />
            </span>
            <span
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Are you sure you want to delete this document permanently?"
                );
                if (isConfirmed) deleteDocument(collectionName, docId);
              }}
              title="delete document"
            >
              <Icon icon="material-symbols-light:delete" />
            </span>
          </div>
          {expiryDate != null ? (
            <div className="expiryTime">
              {daysLeft1 <= 0 ? "Expired" : calculateExpiryText(daysLeft1)}
            </div>
          ) : null}
          {ExpiryDate != null ? (
            <div className="expiryTime">
              {daysLeft2 <= 0 ? "Expired" : calculateExpiryText(daysLeft2)}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CardComponent;

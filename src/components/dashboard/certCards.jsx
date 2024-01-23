/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import "@/styles/dashboard/certCards.css";
import { Icon } from "@iconify/react";

const CardComponent = ({ name, category, expiryDate }) => {
  return (
    <div className="viewCard">
      <input type="checkbox" name="credentilas" id="card_checkbox" />
      <div className={`viewCard_card ${category}`}>
        <div className="viewCard_left">
          <div className={`viewCard_imgCont ${category}`}>
            <Image
              src={`/images/${category}.png`}
              alt={"image error"}
              height={100}
              width={100}
              className="viewCard_img"
            />
          </div>
          <div className="viewCard_info">
            <h1>{name}</h1>
            <div>{category}</div>
          </div>
        </div>
        <div className="viewCard_right">
          <div className="VR_Icons">
            <span>
              <Icon icon="solar:share-outline" />
            </span>
            <span>
              <Icon icon="material-symbols-light:delete" />
            </span>
          </div>
          {expiryDate != null ? (
            <div className="expiryTime">Expires on {expiryDate}</div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

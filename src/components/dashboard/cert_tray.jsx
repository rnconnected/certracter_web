"use client";
import React, { useState } from "react";
import "@/styles/dashboard/cert_tray.css";
import Image from "next/image";

const CertTray = ({ setSelectedCollection, selectedCollection }) => {
  const certData = [
    { label: "All", imagePath: null, title: "All" },
    { label: null, imagePath: "/images/License.png", title: "License" },
    {
      label: null,
      imagePath: "/images/Certification.png",
      title: "Certification",
    },
    { label: null, imagePath: "/images/ceu.png", title: "Eduation" },
    { label: null, imagePath: "/images/vaccination.png", title: "Vaccination" },
    { label: null, imagePath: "/images/travel.png", title: "Travel " },
    { label: null, imagePath: "/images/education.png", title: "CEU" },
    { label: null, imagePath: "/images/others.png", title: "Others" },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleActive = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <div className="certTray">
        {certData.map((data, index) => (
          <span
            key={index}
            onClick={() => {
              handleActive(index);
              if (index == 0) {
                setSelectedCollection(null);
              } else if (index == 1) {
                setSelectedCollection("License");
              } else if (index == 2) {
                setSelectedCollection("Certification");
              } else if (index == 3) {
                setSelectedCollection("Education");
              } else if (index == 4) {
                setSelectedCollection("Vaccination");
              } else if (index == 5) {
                setSelectedCollection("Travel");
              } else if (index == 6) {
                setSelectedCollection("CEU");
              } else if (index == 7) {
                setSelectedCollection("Others");
              }
            }}
            className={`certSpan ${activeIndex === index ? "active" : ""}`}
            title={data.title}
          >
            {data.imagePath ? (
              <Image
                src={data.imagePath}
                alt={`image ${index}`}
                height={500}
                width={500}
                className={"tray_img"}
              />
            ) : (
              data.label
            )}
          </span>
        ))}
      </div>
    </>
  );
};

export default CertTray;

"use client";
import React, { useState } from "react";
import "@/styles/dashboard/cert_tray.css";
import Image from "next/image";

const CertTray = () => {
  const certData = [
    { label: "All", imagePath: null, title: "" },
    { label: null, imagePath: "/images/license.png", title: "Licences" },
    { label: null, imagePath: "/images/certification.png", title: "Certificate" },
    { label: null, imagePath: "/images/ceu.png", title: "Eduation" },
    { label: null, imagePath: "/images/vaccination.png", title: "Vaccination" },
    { label: null, imagePath: "/images/travel.png", title: "Travel documents" },
    {
      label: null,
      imagePath: "/images/education.png",
      title: "Continue Education",
    },
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
            onClick={() => handleActive(index)}
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

"use client";
import React, { useState } from "react";
import "@/styles/dashboard/cert_tray.css";
import Image from "next/image";

const CertTray = () => {
  const certData = [
    { label: "All", imagePath: null },
    { label: null, imagePath: "/images/driver.png" },
    { label: null, imagePath: "/images/certificate.png" },
    { label: null, imagePath: "/images/graduation.png" },
    { label: null, imagePath: "/images/injection.png" },
    { label: null, imagePath: "/images/plane.png" },
    { label: null, imagePath: "/images/education.png" },
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

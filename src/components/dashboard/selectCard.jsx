import React from "react";
import "@/styles/dashboard/selectCard.css";
import Image from "next/image";
import Link from "next/link";

const credentialArray = [
  { imgPath: "/images/licences.png", label: "License", url: "/addLicense" },
  {
    imgPath: "/images/certificate.png",
    label: "Certification",
    url: "/addCert",
  },
  { imgPath: "/images/education.png", label: "Education", url: "/addEdu" },
  {
    imgPath: "/images/vaccination.png",
    label: "Vaccination",
    url: "/addVaccination",
  },
  { imgPath: "/images/travel.png", label: "Travel", url: "/addTravel" },
  { imgPath: "/images/ceu.png", label: "CEU/CME ", url: "/addCeu" },
  { imgPath: "/images/Others.png", label: "Others", url: "/addOther" },
];

const SelectCard = ({ handleSelectCard }) => {
  return (
    <div id="selectedCard_cont" onClick={handleSelectCard}>
      <div className="selectedCard_cont">
        <div className="cardTitle">Select Credentials</div>
        <div className="credentialOptions_cont">
          {credentialArray.map((data, index) => {
            return (
              <Link href={data.url} className="cardOptions" key={index}>
                <span className="imgOpt_cont">
                  <Image
                    src={data.imgPath}
                    alt=""
                    height={500}
                    width={500}
                    className="imgOpt"
                  />
                </span>
                <span className="optionLabel">{data.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectCard;

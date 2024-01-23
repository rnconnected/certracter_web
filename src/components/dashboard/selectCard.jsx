import React from "react";
import "@/styles/dashboard/selectCard.css";
import Image from "next/image";

const credentialArray = [
  { imgPath: "/images/licences.png", label: "License" },
  { imgPath: "/images/certificate.png", label: "Certification" },
  { imgPath: "/images/education.png", label: "Education" },
  { imgPath: "/images/vaccination.png", label: "Vaccination" },
  { imgPath: "/images/travel.png", label: "Travel" },
  { imgPath: "/images/ceu.png", label: "CEU/CME" },
  { imgPath: "/images/Others.png", label: "Others" },
];

const SelectCard = ({ handleSelectCard }) => {
  return (
    <div id="selectedCard_cont" onClick={handleSelectCard}>
      <div className="selectedCard_cont">
        <div className="cardTitle">Select Credentials</div>
        <div className="credentialOptions_cont">
          {credentialArray.map((data, index) => {
            return (
              <div className="cardOptions" key={index}>
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SelectCard;

import React from "react";
import Image from "next/image";

const CardComponent = ({ key, name, category }) => {
  return (
    <div className="viewCard" key={key}>
      <input type="checkbox" />
      <div className="viewCard_card">
        <div className="viewCard_imgCont">
          <Image
            src={"/images/education.png"}
            alt={"image"}
            height={100}
            width={100}
            className="viewCard_img"
          />
        </div>
        <div className="viewCard_info">
          <h1>{name}</h1>
          <div>{category}</div>
        </div>
        <div className="expiryTime">Expires in 120 days</div>
      </div>
    </div>
  );
};

export default CardComponent;

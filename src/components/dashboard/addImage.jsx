import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/addImage.css";
import Image from "next/image";

const AddImage = ({ id }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="inputfile">
      <input
        type="file"
        id={id}
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <label htmlFor={id} className="inputfile_label">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Selected"
            className="selected-image"
            height={200}
            width={200}
          />
        ) : (
          <div className="inputfile_div">
            <Icon icon="ph:camera-light" className="camera_icon" />
            <div className="addfile_txt">Add image</div>
            <small>Supported formats: JPEG, PNG, JPG</small>
          </div>
        )}
      </label>
    </div>
  );
};

export default AddImage;

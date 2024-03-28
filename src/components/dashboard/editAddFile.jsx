import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/addImage.css";
import Image from "next/image";

const EditAddFile = ({ id, onImageSelect, pdfUrl }) => {
  const [selectedImage, setSelectedImage] = useState(pdfUrl || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        setSelectedImage(fileData);
        onImageSelect(fileData);
      };

      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    if (selectedImage && typeof selectedImage === "string") {
      return (
        <div className="pdfFile_cont">
          <embed
            src={selectedImage}
            type="application/pdf"
            width="100%"
            height="300px"
          />
        </div>
      );
    } else {
      return (
        <div className="inputfile_div">
          <Icon icon="pepicons-pencil:file" className="camera_icon" />
          <div className="addfile_txt">Add file</div>
          <small>Supported formats: JPEG, PNG, JPG, PDF...</small>
        </div>
      );
    }
  };

  return (
    <div className="inputfile">
      <input
        type="file"
        id={id}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />

      <label htmlFor={id} className="inputfile_label">
        {renderContent()}
      </label>
    </div>
  );
};

export default EditAddFile;

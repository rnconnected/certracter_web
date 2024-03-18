import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/addImage.css";
import Image from "next/image";

const AddImage = ({ id, onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileType, setFileType] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileData = e.target.result;
        setSelectedImage(fileData);
        setFileType(file.type);
        onImageSelect(fileData);
      };

      reader.readAsDataURL(file);
    }
  };

  const renderContent = () => {
    if (fileType.startsWith("image")) {
      return (
        <Image
          src={selectedImage}
          alt="Selected"
          className="selected-image"
          height={200}
          width={200}
        />
      );
    } else if (fileType === "application/pdf") {
      return (
        <iframe
          src={selectedImage}
          title="Selected PDF"
          width="100%"
          height="400"
        />
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
        <span>Change file</span>
        {selectedImage ? renderContent() : renderContent()}
      </label>
    </div>
  );
};

export default AddImage;

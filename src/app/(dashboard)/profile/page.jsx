"use client";
import React, { useState, useEffect } from "react";
import "@/styles/dashboard/profile.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import getUserData from "@/app/(dashboard)/profile/profileData";
import { storage } from "@/app/firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import CustomAlert from "@/components/customAlert";

const Profile = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [viewImg, setViewImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  const userData = getUserData(user);
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const fetchUploadedImageURL = async () => {
    try {
      const imageRef = ref(storage, "image");
      const downloadURL = await getDownloadURL(imageRef);
      setUploadedImageURL(downloadURL);
    } catch (error) {
      console.error("Error fetching uploaded image:", error);
    }
  };

  useEffect(() => {
    fetchUploadedImageURL();
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  // Function to handle image change
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        const selectedImageDataURL = event.target.result;
        setSelectedImageURL(selectedImageDataURL);
      };
      reader.readAsDataURL(selectedFile);
      setSelectedImage(selectedFile);
    }
    setViewImg(true);
  };

  if (handleImageChange) {
    console.log("image selected");
  } else {
    console.log("image not selected");
  }

  // Function to handle image update
  const handleImageUpdate = async () => {
    try {
      if (!selectedImage) {
        alert("Please select an image");
        return;
      }

      const imageRef = ref(storage, "image");
      await uploadBytes(imageRef, selectedImage);

      const downloadURL = await getDownloadURL(imageRef);
      setSelectedImageURL(downloadURL);
      fetchUploadedImageURL();
      setViewImg(false);
      setShowAlert(true);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Function to handle cancel button click
  const handleCancel = () => {
    setSelectedImage(null);
    setViewImg(false);
  };

  return (
    <>
      <div className="profile-container">
        {showAlert && (
          <div className="showAlert">
            <CustomAlert
              setShowAlert={setShowAlert}
              message="Profile picture Updated"
            />
          </div>
        )}
        <div className="profile-bg">
          <div className="top_bg"></div>
          <div className="bottom_bg"></div>
        </div>
        <div className="profile_contents">
          <div className="profile_header">
            <Link href={"/home"} className="goBack_btn-profile">
              <Icon icon="pajamas:arrow-left" />
              <div className="goBack_txt">Back</div>
            </Link>
            <div className="profile_title">Profile</div>
            <div className="profile_edit">
              <Icon icon="fluent:edit-28-filled" />
              <span>Edit</span>
            </div>
          </div>

          {viewImg && (
            <div className="ppOverlay">
              <div className="view_profile_card">
                <Image
                  src={selectedImageURL || "/images/nullpics.png"}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="view_dp"
                />
                <div className="btn_cont">
                  <button className="upDate_btn" onClick={handleImageUpdate}>
                    Update
                  </button>
                  <button className="upDate_btn" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="profile_card">
            <div className="profile_card_header">
              <div className="profile_img">
                <div className="dpCont">
                  <Image
                    src={uploadedImageURL || "/images/nullpics.png"}
                    alt="logo"
                    height={1000}
                    width={1000}
                    className="dp"
                  />
                </div>
                <div className="inputFile">
                  <input
                    type="file"
                    accept="image/*"
                    id="upload"
                    onChange={handleImageChange}
                  />
                  <label className="update_img" htmlFor="upload">
                    <Icon icon="ph:camera-light" className="camera-icon" />
                  </label>
                </div>
              </div>
            </div>
            <div className="section">
              {userData.map((data, index) => (
                <div className="profileInfo_container" key={index}>
                  <div className="label">{data.title}</div>
                  <span>
                    <small>{data.value}</small>
                    <small className="verify">{data.verify}</small>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

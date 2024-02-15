/* eslint-disable react-hooks/exhaustive-deps */
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
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import CustomAlert from "@/components/customAlert";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/app/firebase/config";

const Profile = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [viewImg, setViewImg] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);
  // const userData = getUserData(user?.uid);
  const [userData, setUserData] = useState();
  const [uploadedImageURL, setUploadedImageURL] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

  const fetchDataAndFormat = async () => {
    try {
      const userDataObject = await getUserData(user?.uid);

      if (userDataObject) {
        const formattedUserData = [
          {
            title: "First Name",
            value: userDataObject.firstName,
            verify: null,
          },
          {
            title: "Last Name",
            value: userDataObject.lastName,
            verify: null,
          },
          {
            title: "Email",
            value: userDataObject.email || "",
            verify: null,
          },
          {
            title: "Phone No.",
            value: userDataObject.phone || "",
            verify: "Verify",
          },
          {
            title: "Date of Birth",
            value: userDataObject.dob || "",
            verify: null,
          },
          {
            title: "State",
            value: userDataObject.state || "",
            verify: null,
          },
          {
            title: "City",
            value: userDataObject.city || "",
            verify: null,
          },
          {
            title: "Zip Code",
            value: userDataObject.zipCode || "",
            verify: null,
          },
        ];

        setUploadedImageURL(userDataObject.profilePicture);
        setUserData(formattedUserData);
      } else {
        console.error("User data not found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (user) {
    fetchDataAndFormat();
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

  const handleImageUpdate = async () => {
    try {
      if (!selectedImage) {
        alert("Please select an image");
        return;
      }

      if (!user) {
        console.error("User not logged in");
        return;
      }

      const imageRef = ref(
        storage,
        `profile_images/${user.uid}/${selectedImage.name}`
      );

      await uploadBytes(imageRef, selectedImage);

      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(firestore, "users", user.uid), {
        profilePicture: downloadURL,
      });

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
      {user && (
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
                    src={selectedImageURL || "images/nullimg.svg"}
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
                      src={uploadedImageURL || "images/nullimg.svg"}
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
                {/* {userData.map((data, index) => (
                  <div className="profileInfo_container" key={index}>
                    <div className="label">{data.title}</div>
                    <span>
                      <small>{data.value}</small>
                      <small className="verify">{data.verify}</small>
                    </span>
                  </div>
                ))} */}
                {userData &&
                  userData.map((data, index) => (
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
      )}
    </>
  );
};

export default Profile;

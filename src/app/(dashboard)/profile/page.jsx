"use client";
import React, { useState, useEffect } from "react";
import "@/styles/dashboard/profile.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { parseCookies } from "nookies";
import { storage } from "@/app/firebase/config";

const userData = [
  {
    title: "First Name",
    value: "John",
    verify: null,
  },
  {
    title: "Last Name",
    value: "Doe",
    verify: null,
  },
  {
    title: "Email",
    value: "w8LjT@example.com",
    verify: null,
  },
  {
    title: "Phone No.",
    value: "+123-456-7890",
    verify: "Verify",
  },
  {
    title: "Date of Birth",
    value: "01/01/2000",
    verify: null,
  },
  {
    title: "State",
    value: "Oklahoma",
    verify: null,
  },
  {
    title: "City",
    value: "Tulsa",
    verify: null,
  },
  {
    title: "Zip Code",
    value: "11011",
    verify: null,
  },
];

const Profile = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [image, setImage] = useState(null);
  const [selectedImageURL, setSelectedImageURL] = useState(null);

  const userData = [
    {
      title: "First Name",
      value: `${user?.displayName.split(" ")[0]}`,
      verify: null,
    },
    {
      title: "Last Name",
      value: `${user?.displayName.split(" ")[1]}`,
      verify: null,
    },
    {
      title: "Email",
      value: `${user?.email}`,
      verify: null,
    },
    {
      title: "Phone No.",
      value: "+123-456-7890",
      verify: "Verify",
    },
    {
      title: "Date of Birth",
      value: "01/01/2000",
      verify: null,
    },
    {
      title: "State",
      value: "Oklahoma",
      verify: null,
    },
    {
      title: "City",
      value: "Tulsa",
      verify: null,
    },
    {
      title: "Zip Code",
      value: "11011",
      verify: null,
    },
  ];

  useEffect(() => {
    const { token } = parseCookies();

    if (!user && !loading) {
      router.push("/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // this is the update or add profile image function
  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event) => {
        setSelectedImageURL(event.target.result);
      };

      reader.readAsDataURL(e.target.files[0]);

      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Check if an image is selected
    if (!image) {
      console.error("Please select an image before uploading.");
      return;
    }

    const uploadTask = storage
      .ref(`profile-pictures/${user.uid}/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error(error.message);
      },
      () => {
        storage
          .ref(`profile-pictures/${user.uid}/${image.name}`)
          .getDownloadURL()
          .then((url) => {
            user
              .updateProfile({
                photoURL: url,
              })
              .then(() => {
                console.log("Profile image updated successfully");
              })
              .catch((updateError) => {
                console.error(
                  "Error updating profile image:",
                  updateError.message
                );
              });
          })
          .catch((urlError) => {
            console.error("Error getting image URL:", urlError.message);
          });
      }
    );
  };
  // end of the update or add profile image function
  return (
    <>
      <div className="profile-container">
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

          {/* this is the profile card section */}
          <div className="profile_card">
            <div className="profile_card_header">
              <div className="profile_img">
                <div className="dpCont">
                  <Image
                    src={selectedImageURL || "/images/nullpics.png"}
                    alt="logo"
                    height={1000}
                    width={1000}
                    className="dp"
                  />
                </div>
                <div className="inputFile">
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    id="upload"
                  />
                  <label className="update_img" htmlFor="upload">
                    <Icon icon="ph:camera-light" className="camera-icon" />
                  </label>
                </div>
              </div>
            </div>
            {/* this is the user name section */}
            <div className="section">
              {userData.map((data, index) => {
                return (
                  <div className="profileInfo_container" key={data.index}>
                    <div className="label">{data.title}</div>
                    <span>
                      <small>{data.value}</small>
                      <small className="verify">{data.verify}</small>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

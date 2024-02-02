"use client";
import React from "react";
import "@/styles/dashboard/profile.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import Image from "next/image";

const user = {
  fname: "Chima",
  lname: "Chukwu",
  email: "uK5kA@example.com",
  phone: "08123456789",
  dob: "01/01/2000",
  state: "Oklahoma",
  city: "Tulsa",
  Z
};

const Profile = () => {
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
                <Image
                  src={"/images/travel.png"}
                  alt="logo"
                  height={1000}
                  width={1000}
                  className="dp"
                />
              </div>
              <div className="update_img">
                <Icon icon="mdi:camera-outline" /> {" Update profile picture"}
              </div>
            </div>
            {/* this is the user name section */}
            <div className="section">
              <div className="profileInfo_container">
                <div className="label">First Name</div>
                <small>{"Devin"}</small>
              </div>
              <div className="profileInfo_container">
                <div className="label">Last Name</div>
                <small>{"Devin"}</small>
              </div>
            </div>
            {/* this is the user contact info section */}
            <div className="section">
              <div className="profileInfo_container">
                <div className="label">Email</div>
                <small>{"Devin@gmail.com"}</small>
              </div>
              <div className="profileInfo_container">
                <div className="label">Phone No.</div>
                <small>{+1234567890}</small> <small>Verify</small>
              </div>
            </div>

            {/* this is the DOB section */}
            <div className="section">
              <div className="profileInfo_container">
                <div className="label">Date of Birth</div>
                <small>{"28th August 2000"}</small>
              </div>
              <div className="profileInfo_container">
                <div className="label">State</div>
                <small>{"Oklahoma"}</small>
              </div>
            </div>

            {/* this is the address section */}
            <div className="section">
              <div className="profileInfo_container">
                <div className="label">City</div>
                <small>{"Tulas"}</small>
              </div>
              <div className="profileInfo_container">
                <div className="label">Zip Code</div>
                <small>{11011}</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

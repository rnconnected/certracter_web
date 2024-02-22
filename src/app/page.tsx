/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "./page.css";
import Link from "next/link";

const trustees = [
  {
    name: "Trustee 1",
    image: "/images/trustee1.png",
  },
  {
    name: "Trustee 2",
    image: "/images/trustee2.png",
  },
  {
    name: "Trustee 3",
    image: "/images/trustee3.png",
  },
  {
    name: "Trustee 4",
    image: "/images/trustee4.png",
  },
  {
    name: "Trustee 5",
    image: "/images/trustee5.png",
  },
  {
    name: "Trustee 6",
    image: "/images/trustee6.png",
  },
  {
    name: "Trustee 7",
    image: "/images/trustee7.png",
  },
  {
    name: "Trustee 8",
    image: "/images/trustee8.png",
  },
  {
    name: "Trustee 9",
    image: "/images/trustee9.png",
  },
];

const Home = () => {
  return (
    <>
      <div className="navbar">
        <Link href={"/home"} className="h_logo">
          <Image
            src={"/images/h_logo.png"}
            alt="logo"
            height={500}
            width={500}
          />
        </Link>
        <div className="navbar_right">
          <Link href={"/about"} id="about_btn">
            About Us
          </Link>
          <Link href={"/signup"} id="signup_btn">
            Create an account
          </Link>
          <Link href={"/signin"} id="signin_btn">
            Login
          </Link>
          <Link href={"/download"} id="download_btn">
            Download App
          </Link>
        </div>
      </div>

      <section className="header">
        <div className="infoTxt_section">
          <div className="infoTxt_h">
            Manage your professional certifications, licenses and CEUs with
            ease.
          </div>
          <div className="infoTxt_b">
            Efficiently manage all your Certifications and Credentials in one
            place - Spend less time on Paperwork, more time on what you do best.
          </div>
          <div className="infoTxt_btn">Get Early Access</div>
        </div>
        <div className="header_img">
          <Image
            src={"/images/landing_img1.png"}
            alt="header"
            width={500}
            height={500}
          />
        </div>
      </section>

      <section className="trustees">
        <div className="trustees_h">Trusted by</div>
        <div className="trustees_cont">
          {trustees.map((trustee, index) => (
            <Link href={"#"} className="trustee" key={index}>
              <Image
                src={trustee.image}
                alt="trustee"
                width={500}
                height={500}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* another section */}
      <section className="group_img-section">
        <div className="group_img-h">
          Start Simplifying Your Certification Management Today
        </div>
        <div className="group_img-b">
          CerTtracker provides a secure and user-friendly platform that
          streamlines the certification management process. Spend less time on
          Paperwork, more time on what you do best.
        </div>
        <div className="group_img_img">
          <Image
            src={"/images/group_img.png"}
            alt="group_img"
            width={1000}
            height={1000}
            className="group_img"
          />
        </div>
      </section>

      {/* another section */}
      <section className="features_info">
        <div className="features_cont">
          <div className="feature_info">
            <div className="features_h">Centralized Document Management</div>
            <div className="features_b">
              CerTracker offers a Centralized platform where healthcare
              professionals can easily manage their certifications, track
              renewal deadlines, and store important documents securely in the
              cloud. This significantly reduces the time and effort spent on
              administrative tasks.
            </div>
          </div>
          <div className="feature_img">
            <Image
              src={"/images/feature_img1.png"}
              alt="feature_img"
              width={500}
              height={500}
              className="feature_img"
            />
          </div>
        </div>
        <div className="features_cont">
          <div className="feature_img">
            <Image
              src={"/images/feature_img2.png"}
              alt="feature_img"
              width={500}
              height={500}
              className="feature_img"
            />
          </div>
          <div className="feature_info">
            <div className="features_h">Manage Continuing Education</div>
            <div className="features_b">
              Unleash the power of simplified CEU tracking and tailored
              recommendations with CerTracker! Propel your healthcare profession
              to new heights as we seamlessly align your interests and
              profession, ensuring you stay ahead with your
              education requirements.
            </div>
          </div>
        </div>
        <div className="features_cont">
          <div className="feature_info">
            <div className="features_h">Automated Renewal Notification</div>
            <div className="features_b">
              We understand that healthcare professionals lead busy lives, and
              missing a certification renewal can have significant consequences.
              CerTracker's automated alert system ensures that users are always
              aware of upcoming deadlines, reducing the risk of lapses in
              certification.
            </div>
          </div>
          <div className="feature_img">
            <Image
              src={"/images/feature_img3.png"}
              alt="feature_img"
              width={500}
              height={500}
              className="feature_img"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;

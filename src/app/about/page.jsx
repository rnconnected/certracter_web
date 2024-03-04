"use client";
import React, { useEffect, useState } from "react";
import "@/styles/about.css";
import Navbar from "@/components/navbar";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
// import Dropdown from "@/components/dropDown";
import { useRouter } from "next/navigation";
import Popup from "@/components/popup";
import Image from "next/image";
import Footer from "@/components/footer";

const About = () => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowpopup] = useState(false);

  useEffect(() => {
    if (router.pathname === "/about") {
      const navbarColor = document.querySelector(".navbar");
      navbarColor.style.backgroundColor = "red";
    }
  });

  const handlePopup = () => {
    setShowpopup(true);
  };
  const closePopup = () => {
    setShowpopup(false);
    setShowDropdown(false);
  };

  return (
    <>
      <Navbar
        handlePopup={handlePopup}
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
      />
      {showPopup ? (
        <div className="popup_glass">
          <Popup closePopup={closePopup} showPopup={showPopup} />
        </div>
      ) : null}
      <header className="about_header">
        <div className="headerBg_cont">
          <Image
            src={"/images/about_bg.png"}
            height={10000}
            width={10000}
            alt={"image"}
            className="headerBg_img"
          />
        </div>
        <div className="header_h_cont">
          <div className="about_header_h">ABOUT US</div>
        </div>
      </header>

      <section className="aboutWelcome_section">
        <div className="aboutWelcome_h">
          <span>Welcome To</span>
          <span className="aboutCerTracker">CerTracker</span>
        </div>
        <div className="aboutWelcome_b">
          We are a team of healthcare professionals and technology experts
          passionate about simplifying the certification management process for
          our fellow healthcare professionals. Our user-friendly platform is
          trusted by healthcare professionals across the industry.
        </div>
        <div className="getStartedBtn">Get Started</div>
      </section>

      <section className="aboutBelief_section">
        <div className="belief_imgCont">
          <Image
            src={"/images/belief_img.png"}
            alt="belief_img"
            width={500}
            height={500}
            className="belief_img"
          />
        </div>
        <div className="belief_info">
          <div className="belief_h">Our Belief</div>
          <div className="belief_b">
            At CerTracker, we believe that managing certifications should be
            simple and stress-free for healthcare professionals. We are
            committed to providing a secure and user-friendly platform that
            streamlines the certification management process, allowing
            healthcare professionals to focus on what matters most - providing
            quality care.
          </div>
        </div>
      </section>

      <section className="meetTeam_section">
        <div className="meetTeam_h">Meet Our Team</div>
        <div className="meetTeam_b">
          CerTracker was founded by a group of healthcare professionals and
          technology experts who recognized the need for a more efficient and
          streamlined certification management solution. Together, we are
          dedicated to empowering healthcare professionals and improving
          compliance in the healthcare industry.
        </div>
      </section>

      <section className="ourStory_Section">
        <div className="meetTeam_h">Our Story</div>
        <div className="story_SH">
          We recognise the difficulties
          <span id="licSpan"> licenced professionals</span> face in juggling
          their important jobs with managing several certificates.
        </div>

        <div className="mainStory">
          <div className="story_txt">
            We understand the challenges that licensed professionals encounter
            when balancing their essential duties with the complex task of
            overseeing numerous certifications. The struggle to stay on top of
            renewal deadlines, maintain compliance, and manage ongoing
            paperwork, all while upholding excellence in your crucial roles, can
            be an overwhelming experience. At CerTracker, we have revolutionized
            certification management for licensed professionals. With our
            expertise in healthcare regulations and a dedicated team of experts,
            we have streamlined certification processes, ensuring compliance and
            up-to-date credentials. Our platform is designed based on feedback
            from nurses, doctors, and healthcare staff, making us a trusted ally
            in professional development. Let us help you focus on what you do
            best
          </div>
          <div className="storyVid_cont">
            <video controls className="storyVid">
              <source src="/images/story_vid.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="closingRemark">
        <div className="closingRemark_h">
          Join CerTracker today and experience the ease of streamlined
          credential management
        </div>
        <div className="freeTrial">
          <div className="enterEmail">
            <input type="email" placeholder="Enter your email" />
            <button>Start free trial</button>
          </div>

          <div className="ratingSection">
            <Icon icon="noto:star" />
            <Icon icon="noto:star" />
            <Icon icon="noto:star" />
            <Icon icon="noto:star" />
            <Icon icon="noto:star" />| Streamline tracking | Automated Renewal
            Alert
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;

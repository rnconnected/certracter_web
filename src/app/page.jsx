/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import "./page.css";
import Link from "next/link";
import Footer from "@/components/footer";
import Popup from "@/components/popup";

const trustees = [
  {
    image: "/images/trustee1.png",
  },
  {
    image: "/images/trustee2.png",
  },
  {
    image: "/images/trustee3.png",
  },
  {
    image: "/images/trustee4.png",
  },
  {
    image: "/images/trustee5.png",
  },
  {
    image: "/images/trustee6.png",
  },
  {
    image: "/images/trustee7.png",
  },
  {
    image: "/images/trustee8.png",
  },
  {
    image: "/images/trustee9.png",
  },
];

const featureCard_data = [
  {
    image: "/images/card_img1.png",
    title: "Mobile Accessibility",
    description:
      "With CerTracker's mobile app, manage your credentials, licenses, and CEUs anytime, anywhere, ensuring you never miss a beat in your professional requirements.",
  },
  {
    image: "/images/card_img2.png",
    title: "Cert Management",
    description:
      "Maintain and manage all your important certifications and credentials from a single account, eliminating the hassle of using multiple platforms or manual tracking systems.",
  },
  {
    image: "/images/card_img3.png",
    title: "License Tracking",
    description:
      "Effortlessly track multiple licenses in one centralized location, simplifying how you manage your professional standing across different jurisdictions or specialties.",
  },
  {
    image: "/images/card_img4.png",
    title: "Digital Document Storage",
    description:
      "Securely upload and access all your certification documents in one place, available anytime, anywhere.",
  },
  {
    image: "/images/card_img5.png",
    title: "CEU Renewal & Guidance",
    description:
      "Receive a detailed breakdown of your CE requirements and license renewal processes, demystifying what's needed to stay compliant and ahead in your career.",
  },
  {
    image: "/images/card_img6.png",
    title: "Timely Reminders",
    description:
      "Never miss a deadline again with personalized license renewal and CE deadline reminders delivered directly to your inbox, ensuring you’re always prepared.",
  },
  {
    image: "/images/card_img7.png",
    title: "Expert Support",
    description:
      "Have questions or need guidance? Our team of CE and license experts is just a message away, ready to provide the support you need to navigate your certification landscape.",
  },
];

const starter_features = [
  "Access to basic certification tracking",
  "Automated renewal alerts up to 2 certifications ",
  "Digital document storage (limited capacity)",
  "Access to community support forums",
];

const professional_features = [
  "Unlimited certification tracking",
  "Advanced automated renewal alerts",
  "Enhanced digital document storage",
  "CEU tracking and management tools",
  "Email support with our CE and license experts",
];

const enterprise_features = [
  "All professional plan features for multiple users",
  "Administrative dashboard for team oversight",
  "Bulk upload and management of certifications",
  "Priority email and phone support",
  "Customizable alerts and notifications for the entire team",
];

const faq_data = [
  {
    question: "How do I subscribe to CerTracker?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo.",
  },
  {
    question: "What is your refund policy?",
    answer:
      "sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo",
  },
  {
    question: "How can I upgrade or cancel my subscription?",
    answer:
      "sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo",
  },
  {
    question: "Who can I contact if I have more questions?",
    answer:
      "sapiente minima quidem delectus consequuntur eius fugit ab provident optio quo. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, nemo",
  },
];

const Home = () => {
  const [faqData, setFaqData] = useState(faq_data);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [showPopup, setShowpopup] = useState(false);

  const handlePopup = () => {
    setShowpopup(true);
  };

  const closePopup = () => {
    setShowpopup(false);
  };

  const toggleAnswer = (index) => {
    const newData = [...faqData];
    newData[index].showAnswer = !newData[index].showAnswer;
    setFaqData(newData);
  };
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
          <Link href={"/#"} id="signup_btn" onClick={handlePopup}>
            Create an account
          </Link>
          <Link href={"/#"} id="signin_btn" onClick={handlePopup}>
            Login
          </Link>
          {/* <div id="signin_btn" onClick={handlePopup}>
            Login
          </div> */}
          <Link href={"/#"} id="download_btn" onClick={handlePopup}>
            Download App
          </Link>
        </div>
      </div>
      {showPopup ? (
        <div className="popup_glass">
          <Popup closePopup={closePopup} />
        </div>
      ) : null}

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
          <div className="infoTxt_btn" onClick={handlePopup}>Get Early Access</div>
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
        <marquee behavior="scroll" direction="">
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
        </marquee>
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
              profession, ensuring you stay ahead with your education
              requirements.
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

      <section className="compliant_cont">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1728 640"
          fill="none"
          className="compliant_svg"
        >
          <path
            d="M0 0H1728V616.499C1728 616.499 1223 448.863 0 616.499C-1223 784.134 0 0 0 0Z"
            fill="#540D6E"
          />
        </svg>
        <div className="place_over">
          <div className="compliant_info">
            <div className="compliant_h">Stay Compliant</div>
            <div className="compliant_b">
              We are a team of healthcare professionals and technology experts
              passionate about simplifying the certification management process
              for our fellow healthcare professionals. Our user-friendly
              platform is trusted by healthcare professionals across the
              industry.
            </div>
          </div>
          <div className="compliant_img_cont">
            <Image
              src={"/images/complaint_img.png"}
              alt="compliant_img"
              width={1000}
              height={1000}
              className="compliant_img"
            />
          </div>
        </div>
      </section>

      {/* the main our features card section */}
      <section className="features_card_section">
        <div className="feature_card_h">Our Features</div>
        <div className="feature_card_cont">
          {featureCard_data.map((item, index) => (
            <div className="feature_card" key={index}>
              <div className="feature_card_img">
                <Image
                  src={item.image}
                  alt="feature_card_img"
                  width={100}
                  height={100}
                  className="feature_card_img_img"
                />
              </div>
              <div className="feature_card_info">
                <div className="feature_card_h">{item.title}</div>
                <div className="feature_card_b">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ready_section">
        <div className="ready_h">Ready to start?</div>
        <div className="ready_b">
          Unlock the full potential of your professional credentialswith
          CerTracker. Choose the plan that best fits your needs and
          startsimplifying your certification management today.
        </div>
        <div className="ready_toggleBtn">
          <div className="readyBtn active monthly">Monthly</div>
          <div className="readyBtn yearly">Yearly</div>
        </div>
      </section>

      <section className="subscription_section">
        <div className="starter_card">
          <div className="starter_h">Starter</div>
          <div className="starter_b">
            Perfect for new professionals and students
          </div>
          <div className="starter_sh">Free</div>
          <hr />
          <div className="keyFeatures_section">
            <div className="keyFeatures_title">Key Features</div>
            <div className="keyFeatures_cont">
              {starter_features.map((item, index) => (
                <div className="keyFeatures" key={index}>
                  <Icon icon="mdi:tick" />
                  <span> {item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="features_card_btn_cont">
            <div className="features_card_btn">Sign up, it's free</div>
          </div>
        </div>

        {/* this is the middle cards section */}
        <div className="professional_card">
          <div className="starter_h">Professional</div>
          <div className="starter_b">
            Ideal for profeessional managing multiple certifications
          </div>
          <div className="starter_sh">Free (for Beta Tetster )</div>
          <hr />
          <div className="keyFeatures_section">
            <div className="keyFeatures_title">Key Features</div>
            <div className="keyFeatures_cont">
              {professional_features.map((item, index) => (
                <div className="keyFeatures" key={index}>
                  <Icon icon="mdi:tick" />
                  <span> {item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="features_card_btn_cont">
            <div className="features_card_btn">Sign up</div>
          </div>
        </div>

        {/* this is the Enterprise section */}
        <div className="enterprise_card">
          <div className="starter_h">Enterprise</div>
          <div className="starter_b">
            Designed for healthcare facilities and educational institution
          </div>
          <div className="starter_sh">Let's Talk</div>
          <hr />
          <div className="keyFeatures_section">
            <div className="keyFeatures_title">Key Features</div>
            <div className="keyFeatures_cont">
              {enterprise_features.map((item, index) => (
                <div className="keyFeatures" key={index}>
                  <Icon icon="mdi:tick" />
                  <span> {item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="features_card_btn_cont">
            <div className="features_card_btn">Contact Us</div>
          </div>
        </div>
      </section>

      {/* this is the FAQ section */}
      <section className="faq_section">
        <div className="faq_h">FAQ</div>
        <div className="faq_cont">
          {faqData.map((item, index) => (
            <div className="faq" key={index}>
              <div className="faq_header">
                <div className="faq_q">{item.question}</div>
                <Icon
                  icon={
                    item.showAnswer ? "ic:outline-minus" : "ic:outline-plus"
                  }
                  className="faq_plus"
                  onClick={() => toggleAnswer(index)}
                />
              </div>
              {item.showAnswer && <div className="faq_a">{item.answer}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* this is the enter email section */}
      <section className="requirements_section">
        <div className="require_h">
          Achieve Your State Licensing Requirements
        </div>
        <div className="emailInput_section">
          <div className="emailInput_cont">
            <Icon icon="material-symbols-light:mail-outline" color="gray" />
            <input
              type="email"
              placeholder="Enter your email address"
              className="email_input"
            />
          </div>
          <input id="startBtn" type="button" value="Get Started >" />
        </div>
      </section>

      {/* this the contact section */}
      <section className="contactUs_section">
        <div className="contactImg_cont">
          <Image
            src={"/images/contact_img.png"}
            height={1000}
            width={1000}
            alt="image"
          />
        </div>
        <div className="contactForm">
          <div className="form_h">Contact Us</div>
          <div className="form">
            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={fullName ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={fullName || fullName === "" ? "" : "rest"}
                id="contactLabel"
              >
                Full Name
              </label>
            </div>

            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={email ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={email || email === "" ? "" : "rest"}
                id="contactLabel"
              >
                E-mail
              </label>
            </div>

            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={message ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={message || message === "" ? "" : "rest"}
                id="contactLabel"
              >
                Message
              </label>
            </div>
            <input type="button" value="Contact Us" className="contactBtn" />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

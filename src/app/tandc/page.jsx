"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import "@/styles/dashboard/tandc.css";

const termsAndCondition = [
  {
    headers: "Introduction",
    text: "Welcome to CerTracker! These Terms and Conditions govern your use of CerTracker and the services we offer. By accessing or using our app, you agree to be bound by these terms",
  },
  {
    headers: "Service Description",
    text: "CerTracker is a certification management platform for healthcare professionals, providing features to track, manage, and renew professional certifications and credentials.",
  },
  {
    headers: "User Accounts",
    text: "To access CerTracker, users must register and create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
  },
  {
    headers: "User Obligations",
    text: "You agree to use CerTracker only for lawful purposes and in a way that does not infringe upon the rights of, restrict, or inhibit anyone else's use and enjoyment of the app.",
  },
  {
    headers: "Privacy Policy",
    text: "Your privacy is important to us. Our Privacy Policy, which is part of these Terms, describes how we collect, use, and protect your personal information.",
  },
  {
    headers: "Intellectual Property Rights",
    text: "All intellectual property rights in the app and its content are owned by us or our licensors. You may not use any content without our express permission, except as permitted by law..",
  },
  {
    headers: "User-Generated Content",
    text: "If you post content to CerTracker, you retain the rights in your content, but you grant us a license to use, store, and share it with others.",
  },
];

const TandC = () => {
  return (
    <>
      <header className="tandc_header">
        <Link href={"/settings"} className="goBack_btn">
          <Icon icon="pajamas:arrow-left" />
          <span className="goBack_txt">Back</span>
        </Link>
        <div className="settings-h">Terms & Conditions</div>
      </header>
      <section className="tandcMain">
        <div className="textConts">
          {termsAndCondition.map((items, index) => {
            return (
              <div key={index}>
                <div className="termsH">{items.headers}</div>
                <div className="termsTxt">{items.text}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default TandC;

"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/settings.css";

// this is for notification display
const ForNotification = () => {
  return (
    <>
      <div className="settings_right">
        <div className="settingRight_h">Credential Notification</div>
        <div className="settingsTXT">
          How do you want to receive notification on all your credentials
        </div>
        <div className="settingInputs">
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">In-app</label>
          </span>
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">Push</label>
          </span>
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">Email</label>
          </span>
        </div>

        {/* this section for the reminder notifications */}
        <div className="settingRight_h2">Reminder Notification</div>
        <div className="settingsTXT">
          How do you want to receive notification on all your credentials
        </div>
        <div className="settingInputs">
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">In-app</label>
          </span>
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">Push</label>
          </span>
          <span>
            <input name="inApp" type="checkbox" />
            <label htmlFor="inApp">Email</label>
          </span>
        </div>
        <div className="saveBtn">Save</div>
      </div>
    </>
  );
};

// this is for terms and condition display
const ForTandC = () => {
  return (
    <>
      <div className="settings_right">
        <div className="tandC_h">Terms & Condition</div>

        <div className="tandc_intro">
          <div className="tandc-introH">Introduction</div>
          <div className="tandc-intoText">
            Welcome to CerTracker! These Terms and Conditions govern your use of
            CerTracker and the services we offer. By accessing or using our app,
            you agree to be bound by these terms
          </div>
        </div>
        <div className="tandc_intro">
          <div className="tandc-introH">Service Description</div>
          <div className="tandc-intoText">
            CerTracker is a certification management platform for healthcare
            professionals, providing features to track, manage, and renew
            professional certifications and credentials.
          </div>
        </div>
        <div className="center">
          <Link href={"/tandc"} className="viewAll">
            View all
          </Link>
        </div>
      </div>
    </>
  );
};

// this is for Change of Password display
const ChangePassword = () => {
  return (
    <>
      <div className="settings_right">
        <h1>this is the change password section</h1>
      </div>
    </>
  );
};

// this is for the FAQ section
const FAQ = () => {
  return (
    <>
      <div className="settings_right">
        <h1>this is for the FAQ</h1>
      </div>
    </>
  );
};

// This is for the contact section
const Contact = () => {
  return (
    <>
      <div className="settings_right">
        <h1>this is the contact section</h1>
      </div>
    </>
  );
};

const Settings = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const LeftItem_array = [
    {
      icon: <Icon icon="mingcute:notification-fill" />,
      text: "Notification",
    },
    {
      icon: <Icon icon="ph:lock" />,
      text: "Change Password",
    },
    {
      icon: <Icon icon="typcn:messages" />,
      text: "FAQ",
    },
    {
      icon: <Icon icon="pepicons-pencil:file" />,
      text: "Term and condition",
    },
    {
      icon: <Icon icon="mingcute:phone-line" />,
      text: "Contact",
    },
  ];

  const handleActiveSetting = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <header className="settings_header">
        <Link href={"/home"} className="goBack_btn">
          <Icon icon="pajamas:arrow-left" />
          <span className="goBack_txt">Back</span>
        </Link>
        <div className="settings-h">Account Settings</div>
      </header>
      <main>
        <div className="seetingsCard">
          <div className="settings_left">
            {LeftItem_array.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`leftItem ${
                    activeIndex === index ? "active" : ""
                  }`}
                  onClick={() => handleActiveSetting(index)}
                >
                  {item.icon}
                  <span className="leftItem_text">{item.text}</span>
                </div>
              );
            })}
          </div>

          {activeIndex !== null && (
            <>
              {activeIndex === 0 && <ForNotification />}
              {activeIndex === 1 && <ChangePassword />}
              {activeIndex === 2 && <FAQ />}
              {activeIndex === 3 && <ForTandC />}
              {activeIndex === 4 && <Contact />}
            </>
          )}
        </div>
      </main>
    </>
  );
};

export default Settings;

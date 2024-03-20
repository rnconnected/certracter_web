"use client";
import React from "react";
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

const Settings = () => {
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
            <div className="leftItem active">
              <Icon icon="mingcute:notification-fill" />
              <span>Notification</span>
            </div>
            <div className="leftItem">
              <Icon icon="ph:lock" />
              <span>Change Password</span>
            </div>
            <div className="leftItem">
              <Icon icon="typcn:messages" />
              <span>FAQ</span>
            </div>
            <div className="leftItem">
              <Icon icon="pepicons-pencil:file" />{" "}
              <span>Term and condition</span>
            </div>
            <div className="leftItem">
              <Icon icon="mingcute:phone-line" /> <span>Contact</span>
            </div>
          </div>

          {/* this section is for the credential notification */}
          <ForTandC />
        </div>
      </main>
    </>
  );
};

export default Settings;

import React, { useState } from "react";
import "@/styles/popup.css";

const Popup = ({ closePopup }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="popup_cont">
        <div className="popup_message">
          <div className="msg_h">
            Thank you for expressing interest in CerTracker!
          </div>
          <div className="msg_b">
            At this time, CerTracker is an invite-only platform, offering
            exclusive early access to a select group of users. To join our
            waiting list and secure your invitation, please sign up. Invites are
            sent out as spaces become available, ensuring that each new member
            receives the attention and support they need to make the most of
            CerTracker.
          </div>
          <div className="msg_closingMsg">
            We appreciate your understanding and look forward to welcoming you
            to CerTracker soon!
          </div>
          <div className="regardFrom">
            <span>Warm regards,</span>
            <span>The CerTracker Team.</span>
          </div>
        </div>

        {/* this sis the form section */}
        <div className="popupForm">
          <div className="closeCont">
            <div className="closePopUp" onClick={closePopup}>
              Close
            </div>
          </div>
          <div className="popupForm_h">Register to be a Beta Tester</div>
          <div className="formInput">
            <input
              id="contactInput"
              type="text"
              value={fname}
              onChange={(e) => setFname(e.target.value)}
              className={fname ? "active" : ""}
            />
            <label
              htmlFor="fullNameInput"
              className={fname || fname === "" ? "" : "rest"}
              id="contactLabel"
            >
              First Name
            </label>
          </div>
          <div className="formInput">
            <input
              id="contactInput"
              type="text"
              value={lname}
              onChange={(e) => setLname(e.target.value)}
              className={lname ? "active" : ""}
            />
            <label
              htmlFor="fullNameInput"
              className={lname || lname === "" ? "" : "rest"}
              id="contactLabel"
            >
              Last Name
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
              Email
            </label>
          </div>
          <div className="popupSubmit_cont">
            <button className="popupSubmit">Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Popup;

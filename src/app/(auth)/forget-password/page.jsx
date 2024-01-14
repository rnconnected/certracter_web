"use client";
import React, { useState } from "react";
import "@/styles/forgetPassword.css";

// this is the reset password card. before the submit button is clicked
const ResetCard = ({ handleChange, handleSubmit, email }) => {
  return (
    <div className="fgtCard">
      <h1>Reset Password</h1>
      <div className="fgtMsg">
        Please enter the email address used for registration. You will receive
        an email with further instruction on how to reset your password.
      </div>
      <div className="fgtEmailCont">
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter your email"
          className="fgt_input"
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="fgtSubmit" onClick={handleSubmit}>
        Submit
      </div>
      <div className="fgtCancel">Cancel</div>
    </div>
  );
};
// this is the end of the reset password card

// this the resend button section
const ResendCard = () => {
  return (
    <div className="fgtCard" style={{ padding: "5rem 0" }}>
      <h1>Reset Password</h1>
      <div className="fgtMsg">
        Thank you. Please check your email for further Instructions.
      </div>
      <div className="question">{"Didn't get an email"}</div>
      <div className="fgtSubmit">Resend</div>
    </div>
  );
};

const ForgotPassowrd = () => {
  const [email, setEmail] = useState("");
  const [cardActive, setCardActive] = useState(true);

  const handleSubmit = () => {
    if (email === "") {
      alert("email is empty");
    } else {
      setCardActive(false);
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <div className="fgtContainer">
        <div className="backgroundfgt">
          <div className="topfgt"></div>
          <div className="bottomfgt"></div>
        </div>
        <div className="cardContainer">
          {cardActive ? (
            <ResetCard
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              email={email}
            />
          ) : (
            <ResendCard />
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassowrd;

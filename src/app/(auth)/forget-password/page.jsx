"use client";
import React, { useState } from "react";
import "@/styles/forgetPassword.css";
import Link from "next/link";
import auth from "@/app/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { signIn } from "next-auth/react";

// this is the reset password card. before the submit button is clicked
const ResetCard = ({ handleChange, email, resetEmail }) => {
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
          type="email"
          name="email"
          placeholder="Enter your email"
          className="fgt_input"
          autoComplete="email"
          value={email}
          onChange={handleChange}
        />
      </div>
      <button
        className="fgtSubmit"
        onClick={() => resetEmail()}
        disabled={!email}
      >
        Submit
      </button>
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
      <Link href={"/reset-password"} className="fgtSubmit">
        Resend
      </Link>
    </div>
  );
};

const ForgotPassowrd = () => {
  const [email, setEmail] = useState("");
  const [cardActive, setCardActive] = useState(true);
  const resetEmail = () => {
    sendPasswordResetEmail(auth, email);
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
              resetEmail={resetEmail}
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

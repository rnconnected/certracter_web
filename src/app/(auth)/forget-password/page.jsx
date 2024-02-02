"use client";
import React, { useState } from "react";
import "@/styles/forgetPassword.css";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";

// Reset password card component
const ResetCard = ({ handleChange, email, setResetSent, setError }) => {
  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError(null);
    } catch (error) {
      setResetSent(false);
      setError(error.message);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleResetPassword} className="fgtCard">
      <h1>Reset Password</h1>
      <div className="fgtMsg">
        Please enter the email address used for registration. You will receive
        an email with further instructions on how to reset your password.
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
      <button type="submit" className="fgtSubmit">
        Submit
      </button>
      <div className="fgtCancel">Cancel</div>
    </form>
  );
};

// Resend card component
const ResendCard = () => {
  return (
    <div className="fgtCard" style={{ padding: "5rem 0" }}>
      <h1>Reset Password</h1>
      <div className="fgtMsg">
        Thank you. Please check your email for further instructions.
      </div>
      <div className="question">{"Didn't get an email"}</div>
      <div href={"/reset-password"} className="fgtSubmit">
        Resend
      </div>

      <Link href={"/signin"} className="gotoSignin">
        Signin {">"}
      </Link>
    </div>
  );
};

// Forgot password component
const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState(null);

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
          {resetSent ? (
            <ResetCard
              handleChange={handleChange}
              email={email}
              setResetSent={setResetSent}
              setError={setError}
            />
          ) : (
            <ResendCard />
          )}
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;

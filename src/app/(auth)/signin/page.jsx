"use client";
import React, { useState, useEffect } from "react";
import "@/styles/signin.css";
import CustomInput from "@/components/customInput";
import { Icon } from "@iconify/react";
import Link from "next/link";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <div className="signin-body">
        <div className="signin-bodyImg">
          <div
            className="signin-overlay"
            style={{ background: "rgba(57, 17, 91, 0.35)" }}
          ></div>
        </div>
        <div className="signin-form">
          <div className="form-welcome">
            <div>Welcome Back!</div>
          </div>
          <div className="formCont">
            <CustomInput
              type={"text"}
              label="Email"
              setValue={setEmail}
              placeholder={"Enter your Email address"}
            />
            <CustomInput
              type={"password"}
              label="Password"
              setValue={setPassword}
              placeholder={"Enter your password"}
            />
          </div>
          <div className="errorCont">
            <div className="errorMsg">{}</div>
            <Link href={"/forget-password"} className="fgtPassword">
              Forgot Password?
            </Link>
          </div>
          <button className="signinBtn allbtn" disabled={!email || !password}>
            Sign in
          </button>
          <div className="or">Or</div>
          <div className="googleBtn allbtn">
            <span className="googleIcon">
              <Icon icon="flat-color-icons:google" />
            </span>
            <span className="googleTxt">Signin with Google</span>
          </div>
          <div className="newComer" style={{ marginTop: "10rem" }}>
            <span>New to Certracker?</span>
            <Link href={"/signup"} className="createAcct">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;

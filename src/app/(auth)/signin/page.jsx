"use client";
import React, { useState, useEffect } from "react";
import "@/styles/signin.css";
import CustomInput from "@/components/customInput";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { auth } from "@/app/firebase/config";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Loading from "@/components/loading";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/home");
    } catch (error) {
      setErrorMsg(error.code);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      console.log("Google sign-in success:", user);

      router.push("/home");
    } catch (error) {
      setErrorMsg(error.code);
      console.error(error);
    } 
  };

  return (
    <>
      {loading ? (
        <div className="loading_cont">
          <Loading />
        </div>
      ) : null}
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
          <div className="errorMsg">{errorMsg}</div>
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
          <div className="signinBtn allbtn" onClick={handleSignIn}>
            Sign in
          </div>
          <div className="or">Or</div>
          <div className="googleBtn allbtn" onClick={signInWithGoogle}>
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

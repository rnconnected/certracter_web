"use client";
import react, { useState } from "react";
import Image from "next/image";
import "@/styles/signin.css";
import CustomInput from "@/components/customInput";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { auth } from "@/app/firebase/config";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const handleSignup = async () => {
    try {
      const res = await createUserWithEmailAndPassword(email, password);
      console.log({ res });
      alert("sign up successfil");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="signin-body">
        <div className="signin-bodyImg">
          <div className="signin-overlay"></div>
        </div>
        <div className="signin-form">
          <div className="form-welcome">
            <div>Welcome to</div>
            <div style={{ color: "#591A8F" }}>Certracker</div>
          </div>
          {/* this is the form section for the all the input elements */}
          <div className="formCont">
            <div className="nameCont">
              <CustomInput
                type={"text"}
                label="First name"
                setValue={setFirstname}
                placeholder={"Enter your firstname"}
              />
              <CustomInput
                type={"text"}
                label="Last name"
                setValue={setLastname}
                placeholder={"Enter your lastname"}
              />
            </div>
            <CustomInput
              type={"text"}
              label="Email"
              setValue={setEmail}
              placeholder={"Enter your email address"}
            />
            <CustomInput
              type={"password"}
              label="Password"
              setValue={setPassword}
              placeholder={"Enter your password"}
            />
            <CustomInput
              type={"password"}
              label=" Re-enter Password"
              setValue={setConfirmPassword}
              placeholder={"Re-enter your password"}
            />
          </div>
          {/* this is the end of the form section for the input elements */}
          <div className="tandc">
            <input type="checkbox" />
            <span>I agree to terms & conditions</span>
          </div>
          <div className="signinBtn allbtn" onClick={handleSignup}>
            Sign in
          </div>
          <div className="or">Or</div>
          <div className="googleBtn allbtn">
            <span className="googleIcon">
              <Icon icon="flat-color-icons:google" />
            </span>
            <span className="googleTxt">Signin with Google</span>
          </div>
          <div className="newComer">
            <span>Already a Certracker member?</span>
            <Link href={"/signin"} className="createAcct">
              Signin
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;

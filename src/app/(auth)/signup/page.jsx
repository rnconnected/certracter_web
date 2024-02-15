"use client";
import { useState } from "react";
import "@/styles/signin.css";
import CustomInput from "@/components/customInput";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { auth, firestore } from "@/app/firebase/config";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailSignUp = async () => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: `${firstname} ${lastname}`,
      });

      await setDoc(doc(firestore, "users", user.uid), {
        firstName: firstname,
        lastName: lastname,
        email: email,
        profilePicture: "",
        phone: "",
        dob: "",
        city: "",
        state: "",
        zipCode: "",
      });

      router.push("/home");
    } catch (error) {
      setErrorMsg(error.code);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
    } else if (!termsChecked) {
      setErrorMsg("Please agree to terms & conditions.");
    } else {
      setErrorMsg("");
      handleEmailSignUp();
    }
  };

  const signUpWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
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
          <div className="signin-overlay"></div>
        </div>
        <div className="signin-form">
          <div className="form-welcome">
            <div>Welcome to</div>
            <div style={{ color: "#591A8F" }}>Certracker</div>
          </div>
          {/* this is the form section for the all the input elements */}
          <div className="errorMsg ">{errorMsg}</div>
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
            <input
              type="checkbox"
              id="tandc"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
            />
            <label id="tandcLabel" htmlFor="tandc">
              I agree to{" "}
              <Link href={"/tandc"} id="tandc">
                {"  terms & conditions"}
              </Link>
            </label>
          </div>
          <div className="signinBtn allbtn" onClick={handleSignupClick}>
            Sign up
          </div>
          <div className="or">Or</div>
          <div className="googleBtn allbtn" onClick={signUpWithGoogle}>
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

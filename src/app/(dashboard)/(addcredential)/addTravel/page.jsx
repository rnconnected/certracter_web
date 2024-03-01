"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import "@/styles/dashboard/addLicense.css";
import AddImage from "@/components/dashboard/addImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { firestore } from "@/app/firebase/config";
import { collection, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import Loading2 from "@/components/loading2";

const AddTravel = () => {
  const router = useRouter();
  const [travelType, setTravelType] = useState("passport");
  const [travelNumber, setTravelNumber] = useState("");
  const [country, setCountry] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [backImage, setBackImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [privateNote, setPrivateNote] = useState("");
  const [PlaceOfIssue, setPlaceOfIssue] = useState("");
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);

  const handleTravelType = (event) => {
    setTravelType(event.target.value);
  };

  const handleFrontImage = (selectedImage) => {
    setFrontImage(selectedImage);
  };

  const handleBackImage = (selectedImage) => {
    setBackImage(selectedImage);
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [loading, router, user]);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  const generateUniqueCredentialsId = () => {
    const timestamp = Date.now().toString();
    return timestamp;
  };

  const saveTravel = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!country || !travelNumber || !PlaceOfIssue) {
      alert("Please fill in all the required fields.");
      setLoading2(false);
      return;
    }
    const credentialsId = generateUniqueCredentialsId();
    const docRef = doc(collection(firestore, "Travel"), credentialsId);
    await setDoc(docRef, {
      Title: travelType,
      backImageUrl: backImage,
      documentNumber: travelNumber,
      expiryDate: expiryDate,
      frontImageUrl: frontImage,
      issueDate: issueDate,
      placeOfIssue: PlaceOfIssue,
      timestamp: timeStamp,
      travelCountry: country,
      travelPrivateNote: privateNote,
      userId: user.uid,
    })
      .then(() => {
        setTravelNumber("");
        setCountry("");
        setIssueDate("");
        setExpiryDate("");
        setPrivateNote("");
        setBackImage("");
        setFrontImage("");
        setPlaceOfIssue("");
        alert("Credential added successfully!");
        router.push("/home");
      })
      .finally(() => setLoading2(false))
      .catch((error) => {
        console.error("Error adding credential:", error);
        alert(error, "use a smaller image file size to prevent the error");
      });
  };

  return (
    <>
      <Header />
      <div className="goBack_btnCont">
        <Link href={"/home"} className="goBack_btn">
          <Icon icon="pajamas:arrow-left" />
          <div className="goBack_txt">Back</div>
        </Link>
      </div>
      <div className="addCert_cardContainer">
        <div className="addCert_card">
          <div className="addCert_cardTitle">Add Travel</div>
          <div className="docType_Cont">
            <span>Document Type: </span>
            <span>
              <input
                type="radio"
                name="travelDoc"
                id="passport"
                value="passport"
                onChange={handleTravelType}
                defaultChecked
              />
              <label htmlFor="passport">Passport</label>
            </span>
            <span>
              <input
                type="radio"
                name="travelDoc"
                id="Driver_license"
                value={"Driver's license"}
                onChange={handleTravelType}
              />
              <label htmlFor="Driver_license">{"Driver's License"}</label>
            </span>
          </div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Country</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(event) => setCountry(event.target.value)}
                  value={country}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Place of Issue</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(event) => setPlaceOfIssue(event.target.value)}
                  value={PlaceOfIssue}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">
                  {travelType === "passport"
                    ? "Passport Number"
                    : "License Number"}
                </label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(event) => setTravelNumber(event.target.value)}
                  value={travelNumber}
                />
              </div>
            </section>
            {/* end of the name section */}

            {/* this is the date section */}
            <section className="date_section">
              <div className="addLicense_inputs2">
                <label htmlFor="name">Issue date (optional)</label>
                <input
                  type="date"
                  className="License_inputs"
                  onChange={(event) => setIssueDate(event.target.value)}
                  value={issueDate}
                />
              </div>
              <div className="addLicense_inputs2">
                <label htmlFor="name">Expiry date (optional)</label>
                <input
                  type="date"
                  className="License_inputs"
                  onChange={(event) => setExpiryDate(event.target.value)}
                  value={expiryDate}
                />
              </div>
            </section>
            {/* end of the date section */}

            {/* the reminder date section */}
            {/* <section className="reminderdate_section">
              <div className="addLicense_inputs3">
                <label htmlFor="name">First reminder</label>
                <input type="date" className="License_inputs " />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Second reminder</label>
                <input type="date" className="License_inputs " />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Final reminder</label>
                <input type="date" className="License_inputs " />
              </div>
            </section> */}
            {/* end of the reminder date section */}
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">Front</div>
              <AddImage id={"front_imgTravel"} onImageSelect={setFrontImage} />
            </div>
            <div className="uploadPhoto_el">
              <div className="upload_back">Back</div>
              <AddImage id={"back_imgTravel"} onImageSelect={setBackImage} />
            </div>
          </section>
          <h2>Private Note</h2>
          <section className="privateNote_cont">
            <div className="saySomething">
              Want to say something about this credential?
            </div>
            <textarea
              name="privateNote"
              id="privateNote"
              className="privateNote"
              onChange={(event) => setPrivateNote(event.target.value)}
              value={privateNote}
            ></textarea>
          </section>
          <div className="saveBtn" onClick={saveTravel}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTravel;

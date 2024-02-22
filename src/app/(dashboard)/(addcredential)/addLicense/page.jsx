"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import "@/styles/dashboard/addLicense.css";
import AddImage from "@/components/dashboard/addImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { firestore } from "@/app/firebase/config";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/loading";
import { useRouter } from "next/navigation";
import Loading2 from "@/components/loading2";

const AddLicense = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [state, setState] = useState("");
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [firstReminder, setFirstReminder] = useState("");
  const [secondReminder, setSecondReminder] = useState("");
  const [finalReminder, setFinalReminder] = useState("");

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

  const saveLicense = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!licenseType || !licenseNumber || !issueDate) {
      alert("Please fill .");
      setLoading2(false);
      return;
    }

    const credentialsId = generateUniqueCredentialsId();
    const docRef = doc(collection(firestore, "License"), credentialsId);

    await setDoc(docRef, {
      Title: licenseType,
      backImageUrl: backImage,
      frontImageUrl: frontImage,
      licenseExpiryDate: expiryDate,
      licenseFinalReminder: finalReminder,
      licenseFirstReminder: firstReminder,
      licenseIssueDate: issueDate,
      licenseNumber: licenseNumber,
      licensePrivateNote: privateNote,
      licenseSecondReminder: secondReminder,
      licenseState: state,
      timestamp: timeStamp,
      userId: user.uid,
    })
      .then(() => {
        console.log("License added successfully", credentialsId);
        setLicenseType("");
        setLicenseNumber("");
        setIssueDate("");
        setExpiryDate("");
        setFirstReminder("");
        setSecondReminder("");
        setFinalReminder("");
        setPrivateNote("");
        setBackImage("");
        setFrontImage("");
        setState("");
        alert("Credential added successfully!");
        router.push("/home");
      })
      .finally(() => setLoading2(false))
      .catch((error) => {
        console.error("Error adding credential:", error);
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
          <div className="addCert_cardTitle">Add License</div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addLicense_Inputs1">
                <label htmlFor="name">License type</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setLicenseType(e.target.value)}
                  value={licenseType}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">License number</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  value={licenseNumber}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">State</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setState(e.target.value)}
                  value={state}
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
                  onChange={(e) => setIssueDate(e.target.value)}
                  value={issueDate}
                />
              </div>
              <div className="addLicense_inputs2">
                <label htmlFor="name">Expiry date (optional)</label>
                <input
                  type="date"
                  className="License_inputs"
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                />
              </div>
            </section>
            {/* end of the date section */}

            {/* the reminder date section */}
            <section className="reminderdate_section">
              <div className="addLicense_inputs3">
                <label htmlFor="name">First reminder</label>
                <input
                  type="date"
                  className="License_inputs "
                  onChange={(e) => setFirstReminder(e.target.value)}
                  value={firstReminder}
                />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Second reminder</label>
                <input
                  type="date"
                  className="License_inputs "
                  onChange={(e) => setSecondReminder(e.target.value)}
                  value={secondReminder}
                />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Final reminder</label>
                <input
                  type="date"
                  className="License_inputs "
                  onChange={(e) => setFinalReminder(e.target.value)}
                  value={finalReminder}
                />
              </div>
            </section>
            {/* end of the reminder date section */}
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">Front</div>
              <AddImage
                id={"front_imgLicense"}
                onImageSelect={handleFrontImage}
              />
            </div>
            <div className="uploadPhoto_el">
              <div className="upload_back">Back</div>
              <AddImage
                id={"back_imgLicense"}
                onImageSelect={handleBackImage}
              />
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
              onChange={(e) => setPrivateNote(e.target.value)}
              value={privateNote}
            ></textarea>
          </section>
          <div className="saveBtn" onClick={saveLicense}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLicense;

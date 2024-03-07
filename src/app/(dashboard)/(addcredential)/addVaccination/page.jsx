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

const AddVaccination = () => {
  const router = useRouter();
  const [vaccineType, setVaccineType] = useState("");
  const [vaccineManufacturer, setVaccineManufacturer] = useState("");
  const [lotNumber, setLotNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [backImage, setBackImage] = useState(null);
  const [frontImage, setFrontImage] = useState(null);
  const [privateNote, setPrivateNote] = useState("");
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);

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

  const saveVaccination = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!vaccineType || !vaccineManufacturer || !lotNumber) {
      alert("Please fill in all the required fields.");
      setLoading2(false);
      return;
    }
    const credentialsId = generateUniqueCredentialsId();
    const docRef = doc(collection(firestore, "Vaccination"), credentialsId);
    await setDoc(docRef, {
      Title: vaccineType,
      backImageUrl: backImage,
      frontImageUrl: frontImage,
      vaccineExpiryDate: expiryDate,
      vaccineIssueDate: issueDate,
      vaccineLotNumber: lotNumber,
      vaccinePrivateNote: privateNote,
      timestamp: timeStamp,
      userId: user.uid,
      vaccineType: vaccineType,
      vaccineManufacturer: vaccineManufacturer,
    })
      .then(() => {
        setVaccineType("");
        setLotNumber("");
        setIssueDate("");
        setExpiryDate("");
        setPrivateNote("");
        setBackImage("");
        setFrontImage("");
        setVaccineManufacturer("");
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
          <div className="addCert_cardTitle">Add Vaccination</div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Type of Vaccine</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setVaccineType(e.target.value)}
                  value={vaccineType}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Vaccine Manufacturer</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setVaccineManufacturer(e.target.value)}
                  value={vaccineManufacturer}
                />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Lot Number</label>
                <input
                  type="text"
                  className="License_inputs"
                  onChange={(e) => setLotNumber(e.target.value)}
                  value={lotNumber}
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
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">Front</div>
              <AddImage
                id={"front_imgVaccination"}
                onImageSelect={handleFrontImage}
              />
            </div>
            <div className="uploadPhoto_el">
              <div className="upload_back">Back</div>
              <AddImage
                id={"back_imgVaccination"}
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
          <div className="saveBtn" onClick={saveVaccination}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddVaccination;

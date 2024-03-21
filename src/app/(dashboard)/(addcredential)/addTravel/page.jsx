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
import convertImageToPDF from "@/components/dashboard/pdfConverter";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { storage } from "@/app/firebase/config";

const AddTravel = () => {
  const router = useRouter();
  const [travelType, setTravelType] = useState("passport");
  const [travelNumber, setTravelNumber] = useState("");
  const [country, setCountry] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [fileUrl, setFileUrl] = useState(null);
  const [privateNote, setPrivateNote] = useState("");
  const [PlaceOfIssue, setPlaceOfIssue] = useState("");
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);

  const handleTravelType = (event) => {
    setTravelType(event.target.value);
  };

  const handleUploadFile = (selectedImage) => {
    setFileUrl(selectedImage);
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
    let fileForUpload;

    if (fileUrl.startsWith("data:application/pdf")) {
      fileForUpload = fileUrl;
    } else {
      const pdfData = await convertImageToPDF(fileUrl);
      fileForUpload = pdfData;
    }

    const credentialsId = generateUniqueCredentialsId();

    const storageRef = ref(
      storage,
      `credentials_files/${user.uid}/${credentialsId}.pdf`
    );

    try {
      if (typeof fileForUpload === "string") {
        await uploadString(storageRef, fileForUpload, "data_url");
      } else {
        await uploadBytes(storageRef, fileForUpload);
      }

      const pdfFileUrl = await getDownloadURL(storageRef);

      const docRef = doc(collection(firestore, "Travel"), credentialsId);
      await setDoc(docRef, {
        Country: country,
        FileDownloadUrl: pdfFileUrl,
        PrivateNote: privateNote,
        Title: travelType,
        documentNumber: travelNumber,
        expiryDate: expiryDate,
        issueDate: issueDate,
        placeOfIssue: PlaceOfIssue,
        timestamp: timeStamp,
        userId: user.uid,
      });
      setTravelNumber("");
      setCountry("");
      setIssueDate("");
      setExpiryDate("");
      setPrivateNote("");
      setFileUrl("");
      setPlaceOfIssue("");
      setPrivateNote("");
      alert("Credential added successfully!");
      router.push("/home");
    } catch (error) {
      console.error("Error adding credential:", error);
      alert(error.message);
    } finally {
      setLoading2(false);
    }
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
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">Front</div>
              <AddImage
                id={"front_imgTravel"}
                onImageSelect={handleUploadFile}
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

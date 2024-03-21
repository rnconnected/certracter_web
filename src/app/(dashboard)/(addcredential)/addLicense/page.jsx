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
import convertImageToPDF from "@/components/dashboard/pdfConverter";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { storage } from "@/app/firebase/config";

const AddLicense = () => {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [state, setState] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [privateNote, setPrivateNote] = useState("");

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

  const saveLicense = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!licenseType || !licenseNumber) {
      alert("Please fill all required fields.");
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

      const docRef = doc(collection(firestore, "License"), credentialsId);
      await setDoc(docRef, {
        ExpiryDate: expiryDate,
        FileDownloadUrl: pdfFileUrl,
        IssueDate: issueDate,
        Number: licenseNumber,
        PrivateNote: privateNote,
        State: state,
        Title: licenseType,
        timestamp: timeStamp,
        userId: user.uid,
      });
      setLicenseType("");
      setLicenseNumber("");
      setIssueDate("");
      setExpiryDate("");
      setPrivateNote("");
      setFileUrl("");
      setState("");
      alert("Credential added successfully!");
      router.push("/home");
    } catch (error) {
      console.error("Error adding credential:", error);
      alert(error.message);
    } finally {
      setLoading2(false);
    }
  };

  // const docRef = doc(collection(firestore, "Travel"), credentialsId);
  // await setDoc(docRef, {
  //   Title: travelType,
  //   documentNumber: travelNumber,
  //   expiryDate: expiryDate,
  //   frontImageUrl: frontImage,
  //   issueDate: issueDate,
  //   placeOfIssue: PlaceOfIssue,
  //   timestamp: timeStamp,
  //   travelCountry: country,
  //   travelPrivateNote: privateNote,
  //   userId: user.uid,
  // })
  //   .then(() => {
  //     setTravelNumber("");
  //     setCountry("");
  //     setIssueDate("");
  //     setExpiryDate("");
  //     setBackImage("");
  //     setFrontImage("");
  //     setPlaceOfIssue("");
  //     alert("Credential added successfully!");
  //     router.push("/home");
  //   })
  //   .finally(() => setLoading2(false))
  //   .catch((error) => {
  //     console.error("Error adding credential:", error);
  //     alert(error, "use a smaller image file size to prevent the error");
  //   });

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
          </div>

          {/* this is the upload photo section */}
          <h1>Upload File</h1>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <AddImage
                id={"front_imgLicense"}
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

"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import AddImage from "@/components/dashboard/addImage";
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

const AddOther = () => {
  const router = useRouter();
  const [credentialName, setCredentialName] = useState("");
  const [credentialNumber, setCredentialNumber] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [privateNote, setPrivateNote] = useState("");
  const [fileUrl, setFileUrl] = useState(null);
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const { user, loading } = useAuth();
  const [loading2, setLoading2] = useState(false);

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

  const saveOthers = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!credentialName) {
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

      const docRef = doc(collection(firestore, "Others"), credentialsId);
      await setDoc(docRef, {
        ExpiryDate: expiryDate,
        FileDownloadUrl: pdfFileUrl,
        IssueDate: issueDate,
        Number: credentialNumber,
        PrivateNote: privateNote,
        Title: credentialName,
        timestamp: timeStamp,
        userId: user.uid,
      });
      setCredentialName("");
      setCredentialNumber("");
      setIssueDate("");
      setExpiryDate("");
      setPrivateNote("");
      setFileUrl("");
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
          <div className="addCert_cardTitle">Add Orthers</div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addCert_Inputs1">
                <label htmlFor="name">Credential name</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(event) => setCredentialName(event.target.value)}
                  value={credentialName}
                />
              </div>
              <div className="addCert_Inputs1">
                <label htmlFor="name">
                  Credential record number (optional)
                </label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(event) => setCredentialNumber(event.target.value)}
                  value={credentialNumber}
                />
              </div>
            </section>
            {/* end of the name section */}

            {/* this is the date section */}
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Issue Date (optional)</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(event) => setIssueDate(event.target.value)}
                  value={issueDate}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="inputs"
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
                id={"front_imgOther"}
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
          <div className="saveBtn" onClick={saveOthers}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddOther;

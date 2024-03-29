"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import AddImage from "@/components/dashboard/addImage";
import { firestore } from "@/app/firebase/config";
import { collection, serverTimestamp, setDoc, doc } from "firebase/firestore";
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

const AddCeu = () => {
  const router = useRouter();
  const [programTitle, setProgramTitle] = useState("");
  const [providerName, setProviderName] = useState("");
  const [contactHours, setcontactHours] = useState("");
  const [endDate, setEndDate] = useState("");
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

  const handleSaveCeu = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }

    if (!programTitle || !providerName || !contactHours) {
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

      const docRef = doc(collection(firestore, "CEU"), credentialsId);
      await setDoc(docRef, {
        Completion_Date: endDate,
        FileDownloadUrl: pdfFileUrl,
        Name: providerName,
        Number_Of_Contact_Hour: contactHours,
        PrivateNote: privateNote,
        Title: programTitle,
        timestamp: timeStamp,
        userId: user.uid,
      });
      setProgramTitle("");
      setProviderName("");
      setEndDate("");
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
          <div className="addCert_cardTitle">Add CEU/CME</div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addCert_Inputs1">
                <label htmlFor="name">Program Title</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(event) => setProgramTitle(event.target.value)}
                  value={programTitle}
                />
              </div>
              <div className="addCert_Inputs1">
                <label htmlFor="name">{"Provider's Name"}</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(event) => setProviderName(event.target.value)}
                  value={providerName}
                />
              </div>
            </section>
            {/* end of the name section */}

            {/* this is the date section */}
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Number of Contact hours</label>
                <input
                  type="number"
                  className="inputs"
                  onChange={(event) => setcontactHours(event.target.value)}
                  value={contactHours}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Completion Date (optional)</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(event) => setEndDate(event.target.value)}
                  value={endDate}
                />
              </div>
            </section>
            {/* end of the date section */}
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">File</div>
              <AddImage id={"front_imgCeu"} onImageSelect={handleUploadFile} />
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
          <div className="saveBtn" onClick={handleSaveCeu}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCeu;

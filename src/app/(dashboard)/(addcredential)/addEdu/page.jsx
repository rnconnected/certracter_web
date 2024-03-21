"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import "@/styles/dashboard/addEdu.css";
import AddImage from "@/components/dashboard/addImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
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

const AddEdu = () => {
  const router = useRouter();
  const [institutionName, setInstitutionName] = useState("");
  const [degree, setDegree] = useState("");
  const [field, setField] = useState("");
  const [graduationDate, setGraduationDate] = useState("");
  const [timeStamp, setTimeStamp] = useState(serverTimestamp());
  const [fileUrl, setFileUrl] = useState(null);
  const [privateNote, setPrivateNote] = useState("");
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

  const handleSaveEdu = async () => {
    setLoading2(true);
    if (!user) {
      alert("User is not authenticated.");
      return;
    }
    if (!institutionName || !field || !degree) {
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

      const docRef = doc(collection(firestore, "Education"), credentialsId);
      await setDoc(docRef, {
        Degree: degree,
        Field: field,
        FileDownloadUrl: pdfFileUrl,
        GraduationDate: graduationDate,
        PrivateNote: privateNote,
        Title: institutionName,
        timestamp: timeStamp,
        userId: user.uid,
      });
      setInstitutionName("");
      setField("");
      setDegree("");
      setGraduationDate("");
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
          <div className="addCert_cardTitle">Add Education</div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addEdu_Inputs1">
                <label htmlFor="name">Name of Institution</label>
                <input
                  type="text"
                  className="edu_inputs"
                  onChange={(e) => setInstitutionName(e.target.value)}
                  value={institutionName}
                />
              </div>
              <div className="addEdu_Inputs1">
                <label htmlFor="name">Degree</label>
                <input
                  type="text"
                  className="edu_inputs"
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                />
              </div>
            </section>
            {/* end of the name section */}

            {/* this is the date section */}
            <section className="date_section">
              <div className="addEdu_Inputs1">
                <label htmlFor="name">Field of sudy</label>
                <input
                  type="text"
                  className="edu_inputs"
                  onChange={(e) => setField(e.target.value)}
                  value={field}
                />
              </div>
              <div className="addEdu_Inputs1">
                <label htmlFor="name">Graduation date (optional)</label>
                <input
                  type="date"
                  className="edu_inputs"
                  onChange={(e) => setGraduationDate(e.target.value)}
                  value={graduationDate}
                />
              </div>
            </section>
            {/* end of the date section */}
          </div>

          {/* this is the upload photo section */}
          <h2>Upload File</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              {/* <div className="upload_front">Front</div> */}
              <AddImage id={"front_imgEdu"} onImageSelect={handleUploadFile} />
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
          <div className="saveBtn" onClick={handleSaveEdu}>
            {loading2 ? <Loading2 /> : "Save Credential"}
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEdu;

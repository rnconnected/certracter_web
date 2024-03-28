import React, { useState } from "react";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/editCredential.css";
import EditAddFile from "../editAddFile";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/app/firebase/config";
import convertImageToPDF from "@/components/dashboard/pdfConverter";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/loading";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadString,
} from "firebase/storage";
import { storage } from "@/app/firebase/config";

const EditEdu = ({
  setIsEditEduActive,
  Title,
  Degree,
  Field,
  GraduationDate,
  PrivateNote,
  FileDownloadUrl,
  docId,
  onRefetch,
}) => {
  const [title, setTitle] = useState(Title);
  const [degree, setDegree] = useState(Degree);
  const [field, setField] = useState(Field);
  const [graduationDate, setGraduationDate] = useState(GraduationDate);
  const [privateNote, setPrivateNote] = useState(PrivateNote);
  const [pdfUrl, setPdfUrl] = useState(FileDownloadUrl);
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);

  const handleUploadFile = (selectedImage) => {
    setPdfUrl(selectedImage);
    setIsNewFileSelected(true);
  };

  const handleEditEdu = async (id) => {
    setIsLoading(true);

    let fileForUpload;

    if (isNewFileSelected) {
      if (pdfUrl.startsWith("data:application/pdf")) {
        fileForUpload = pdfUrl;
      } else {
        const pdfData = await convertImageToPDF(pdfUrl);
        fileForUpload = pdfData;
      }
      const storageRef = ref(
        storage,
        `credentials_files/${user.uid}/${id}.pdf`
      );
      try {
        if (typeof fileForUpload === "string") {
          await uploadString(storageRef, fileForUpload, "data_url");
        } else {
          await uploadBytes(storageRef, fileForUpload);
        }

        const pdfFileUrl = await getDownloadURL(storageRef);

        const userDocRef = doc(firestore, "Education", id);

        await updateDoc(userDocRef, {
          Title: title,
          Degree: degree,
          Field: field,
          GraduationDate: graduationDate,
          PrivateNote: privateNote,
          FileDownloadUrl: pdfFileUrl,
        });
        onRefetch();
        alert("Profile updated successfully");
        setIsEditEduActive(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating user data:", error);
        setIsLoading(false);
      }
    } else {
      const userDocRef = doc(firestore, "Education", id);

      await updateDoc(userDocRef, {
        Title: title,
        Degree: degree,
        Field: field,
        GraduationDate: graduationDate,
        PrivateNote: privateNote,
      });
      onRefetch();
      alert("Profile updated successfully");
      setIsEditEduActive(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="invi_glass">
        <div className="edit_card">
          <div className="editCard_header">
            <div className="cancel" onClick={() => setIsEditEduActive(false)}>
              <Icon icon="fluent-mdl2:cancel" />
            </div>
            <div className="header_title">Edit Education</div>
            <div className="savebtn" onClick={() => handleEditEdu(docId)}>
              Save
            </div>
          </div>
          <div className="editBody">
            {isLoading && (
              <div className="centerLoading">
                <Loading />
              </div>
            )}
            <section className="editInput1">
              <div className="flex_2">
                <label htmlFor="name">Name Of Institution</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">Degree</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                />
              </div>
            </section>
            <section className="editInput1">
              <div className="flex_2">
                <label htmlFor="name">Field of Study</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setField(e.target.value)}
                  value={field}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">Graduation Date</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(e) => setGraduationDate(e.target.value)}
                  value={graduationDate}
                />
              </div>
            </section>
            <div className="pdfFile_center">
              <div className="editPdf_file">
                <label htmlFor="editLicense">
                  <Icon icon="akar-icons:pencil" />
                </label>
                <span>
                  <Icon icon="tabler:trash" />
                </span>
              </div>
              <div className="pdfFile_cont">
                <EditAddFile
                  id={"editLicense"}
                  onImageSelect={handleUploadFile}
                  pdfUrl={pdfUrl && pdfUrl}
                />
              </div>
            </div>
            <section className="privateNote_cont">
              <h2>Private Note</h2>
              <textarea
                name="privateNote"
                id="privateNote"
                className="privateNote"
                onChange={(e) => setPrivateNote(e.target.value)}
                value={privateNote}
              ></textarea>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditEdu;

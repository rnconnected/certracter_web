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

const EditCeu = ({
  setIsEditCeuActive,
  Title,
  Completion_Date,
  Name,
  Number_Of_Contact_Hour,
  PrivateNote,
  FileDownloadUrl,
  docId,
  onRefetch,
}) => {
  const [title, setTitle] = useState(Title);
  const [contactHours, setContactHours] = useState(Number_Of_Contact_Hour);
  const [completionDate, setCompletionDate] = useState(Completion_Date);
  const [name, setName] = useState(Name);
  const [privateNote, setPrivateNote] = useState(PrivateNote);
  const [pdfUrl, setPdfUrl] = useState(FileDownloadUrl);
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);

  const handleUploadFile = (selectedImage) => {
    setPdfUrl(selectedImage);
    setIsNewFileSelected(true);
  };

  const handleEditCeu = async (id) => {
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
        const userDocRef = doc(firestore, "CEU", id);

        await updateDoc(userDocRef, {
          Title: title,
          Completion_Date: completionDate,
          Name: name,
          Number_Of_Contact_Hour: contactHours,
          PrivateNote: privateNote,
          FileDownloadUrl: pdfFileUrl,
        }).then(() => {
          onRefetch();
          alert("Profile updated successfully");
          setIsEditCeuActive(false);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    } else {
      const userDocRef = doc(firestore, "CEU", id);

      await updateDoc(userDocRef, {
        Title: title,
        Completion_Date: completionDate,
        Name: name,
        Number_Of_Contact_Hour: contactHours,
        PrivateNote: privateNote,
      });
      onRefetch();
      alert("Profile updated successfully");
      setIsEditCeuActive(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="invi_glass">
        <div className="edit_card">
          <div className="editCard_header">
            <div className="cancel" onClick={() => setIsEditCeuActive(false)}>
              <Icon icon="fluent-mdl2:cancel" />
            </div>
            <div className="header_title">Edit CEU/CME</div>
            <div className="savebtn" onClick={() => handleEditCeu(docId)}>
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
                <label htmlFor="name">Programme Title</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">{"Provider's"} Name</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            </section>
            <section className="editInput1">
              <div className="flex_2">
                <label htmlFor="name">Number Of Contact Hours</label>
                <input
                  type="number"
                  className="inputs"
                  onChange={(e) => setContactHours(e.target.value)}
                  value={contactHours}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">Completion Date</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(e) => setCompletionDate(e.target.value)}
                  value={completionDate}
                />
              </div>
            </section>
            <div className="pdfFile_center">
              <div className="editPdf_file">
                <label htmlFor="editCeu">
                  <Icon icon="akar-icons:pencil" />
                </label>
                {/* <span>
                  <Icon icon="tabler:trash" />
                </span> */}
              </div>
              <div className="pdfFile_cont">
                <EditAddFile
                  id={"editCeu"}
                  onImageSelect={handleUploadFile}
                  pdfUrl={pdfUrl}
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

export default EditCeu;

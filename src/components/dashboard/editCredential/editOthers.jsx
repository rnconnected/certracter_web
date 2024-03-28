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

const EditOthers = ({
  setIsEditOthersActive,
  Title,
  IssueDate,
  ExpiryDate,
  Number,
  PrivateNote,
  FileDownloadUrl,
  docId,
  onRefetch,
}) => {
  const [title, setTitle] = useState(Title);
  const [number, setNumber] = useState(Number);
  const [issueDate, setIssueDate] = useState(IssueDate);
  const [expiryDate, setExpiryDate] = useState(ExpiryDate);
  const [privateNote, setPrivateNote] = useState(PrivateNote);
  const [pdfUrl, setPdfUrl] = useState(FileDownloadUrl);
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);

  const handleUploadFile = (selectedImage) => {
    setPdfUrl(selectedImage);
    setIsNewFileSelected(true);
  };

  const handleEditOthers = async (id) => {
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
        const userDocRef = doc(firestore, "Others", id);

        await updateDoc(userDocRef, {
          Title: title,
          IssueDate: issueDate,
          ExpiryDate: expiryDate,
          Number: number,
          PrivateNote: privateNote,
          FileDownloadUrl: pdfFileUrl,
        }).then(() => {
          onRefetch();
          alert("Profile updated successfully");
          setIsEditOthersActive(false);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    } else {
      const userDocRef = doc(firestore, "Others", id);

      await updateDoc(userDocRef, {
        Title: title,
        IssueDate: issueDate,
        ExpiryDate: expiryDate,
        Number: number,
        PrivateNote: privateNote,
      });
      onRefetch();
      alert("Profile updated successfully");
      setIsEditOthersActive(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="invi_glass">
        <div className="edit_card">
          <div className="editCard_header">
            <div
              className="cancel"
              onClick={() => setIsEditOthersActive(false)}
            >
              <Icon icon="fluent-mdl2:cancel" />
            </div>
            <div className="header_title">Edit Others</div>
            <div className="savebtn" onClick={() => handleEditOthers(docId)}>
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
                <label htmlFor="name">Credential Name</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">Credential Record Number(optional)</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setNumber(e.target.value)}
                  value={number}
                />
              </div>
            </section>
            <section className="editInput1">
              <div className="flex_2">
                <label htmlFor="name">Issue Date</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(e) => setIssueDate(e.target.value)}
                  value={issueDate}
                />
              </div>
              <div className="flex_2">
                <label htmlFor="name">Expiry Date</label>
                <input
                  type="date"
                  className="inputs"
                  onChange={(e) => setExpiryDate(e.target.value)}
                  value={expiryDate}
                />
              </div>
            </section>
            <div className="pdfFile_center">
              <div className="editPdf_file">
                <span>
                  <Icon icon="akar-icons:pencil" />
                </span>
                {/* <span>
                  <Icon icon="tabler:trash" />
                </span> */}
              </div>
              <div className="pdfFile_cont">
                <EditAddFile
                  id={"editLicense"}
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

export default EditOthers;

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

const EditVaccine = ({
  setIsEditVaccineActive,
  Title,
  IssueDate,
  ExpiryDate,
  LotNumber,
  Manufacturer,
  PrivateNote,
  FileDownloadUrl,
  docId,
  onRefetch,
  collection,
}) => {
  const [title, setTitle] = useState(Title);
  const [lotNumber, setLotNumber] = useState(LotNumber);
  const [issueDate, setIssueDate] = useState(IssueDate);
  const [expiryDate, setExpiryDate] = useState(ExpiryDate);
  const [manufacturer, setManufacturer] = useState(Manufacturer);
  const [privateNote, setPrivateNote] = useState(PrivateNote);
  const [pdfUrl, setPdfUrl] = useState(FileDownloadUrl);
  const { user, loading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isNewFileSelected, setIsNewFileSelected] = useState(false);
  const handleUploadFile = (selectedImage) => {
    setPdfUrl(selectedImage);
    setIsNewFileSelected(true);
  };

  const handleEditVaccine = async (id) => {
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
        const userDocRef = doc(firestore, "License", id);

        await updateDoc(userDocRef, {
          Title: title,
          IssueDate: issueDate,
          ExpiryDate: expiryDate,
          LotNumber: lotNumber,
          Manufacturer: manufacturer,
          PrivateNote: privateNote,
          FileDownloadUrl: pdfFileUrl,
        }).then(() => {
          onRefetch();
          alert("Profile updated successfully");
          setIsEditVaccineActive(false);
          setIsLoading(false);
        });
      } catch (error) {
        console.error("Error updating user data:", error);
      }
    } else {
      const userDocRef = doc(firestore, "Vaccination", id);

      await updateDoc(userDocRef, {
        Title: title,
        IssueDate: issueDate,
        ExpiryDate: expiryDate,
        LotNumber: lotNumber,
        Manufacturer: manufacturer,
        PrivateNote: privateNote,
      });
      onRefetch();
      alert("Profile updated successfully");
      setIsEditVaccineActive(false);
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="invi_glass">
        <div className="edit_card">
          <div className="editCard_header">
            <div className="cancel">
              <Icon
                icon="fluent-mdl2:cancel"
                onClick={() => setIsEditVaccineActive(false)}
              />
            </div>
            <div className="header_title">Edit Vaccination</div>
            <div className="savebtn" onClick={() => handleEditVaccine(docId)}>
              Save
            </div>
          </div>
          <div className="editBody">
            {" "}
            {isLoading && (
              <div className="centerLoading">
                <Loading />
              </div>
            )}
            <section className="editInput1">
              <div className="flex_1">
                <label htmlFor="name">Type Of Vaccine</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div className="flex_1">
                <label htmlFor="name">Vaccine Manufacturer</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setManufacturer(e.target.value)}
                  value={manufacturer}
                />
              </div>
              <div className="flex_1">
                <label htmlFor="name">Lot Number</label>
                <input
                  type="text"
                  className="inputs"
                  onChange={(e) => setLotNumber(e.target.value)}
                  value={lotNumber}
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
                <label htmlFor="editVaccine">
                  <Icon icon="akar-icons:pencil" />
                </label>
                <span>
                  <Icon icon="tabler:trash" />
                </span>
              </div>
              <div className="pdfFile_cont">
                <EditAddFile
                  id={"editVaccine"}
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

export default EditVaccine;

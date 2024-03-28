"use client";
import { useEffect, useState } from "react";
import { firestore } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/app/hooks/useAuth";
import Loading from "@/components/loading";
import Header from "@/components/dashboard/header";
import Link from "next/link";
import { Icon } from "@iconify/react";
import "@/styles/dashboard/viewCert.css";
import Image from "next/image";
import EditLicense from "@/components/dashboard/editCredential/editLicense";
import EditCert from "@/components/dashboard/editCredential/editCert";
import EditEdu from "@/components/dashboard/editCredential/editEdu";
import EditVaccine from "@/components/dashboard/editCredential/editVaccine";
import EditOthers from "@/components/dashboard/editCredential/editOthers";
import EditTravel from "@/components/dashboard/editCredential/editTravel";
import EditCeu from "@/components/dashboard/editCredential/editCeu";

const ViewCert = ({ params }) => {
  const { user, loading } = useAuth();
  const [cardData, setCardData] = useState(null);
  const decodeParams = decodeURIComponent(params.credentialId);
  const collection = decodeParams.split(":")[1];
  const id = decodeParams.split(":")[2];
  const isLicense = collection === "License";
  const isCEU = collection === "CEU";
  const isCertificate = collection === "Certification";
  const isOthers = collection === "Others";
  const isVaccine = collection === "Vaccination";
  const isTravel = collection === "Travel";
  const isEdu = collection === "Education";
  const [triggerRefetch, setTriggerRefetch] = useState(false);

  // edit constants
  const [isEditLicenseActive, setIsEditLicenseActive] = useState(false);
  const [isEditCeuActive, setIsEditCeuActive] = useState(false);
  const [isEditCertActive, setIsEditCertActive] = useState(false);
  const [isEditEduActive, setIsEditEduActive] = useState(false);
  const [isEditVaccineActive, setIsEditVaccineActive] = useState(false);
  const [isEditTravelActive, setIsEditTravelActive] = useState(false);
  const [isEditOthersActive, setIsEditOthersActive] = useState(false);

  const fetchCardData = async () => {
    try {
      const documentRef = doc(firestore, collection, id);
      const docSnap = await getDoc(documentRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCardData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  useEffect(() => {
    if (collection && id) {
      fetchCardData();
    } else {
      console.log("No collection or id provided");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <Loading />
      </div>
    );
  }

  const setEditCardActive = () => {
    if (isLicense) {
      setIsEditLicenseActive(true);
    } else if (isCEU) {
      setIsEditCeuActive(true);
    } else if (isCertificate) {
      setIsEditCertActive(true);
    } else if (isEdu) {
      setIsEditEduActive(true);
    } else if (isVaccine) {
      setIsEditVaccineActive(true);
    } else if (isTravel) {
      setIsEditTravelActive(true);
    } else if (isOthers) {
      setIsEditOthersActive(true);
    } else {
      console.error("Unknown collection value");
    }
  };

  return (
    user && (
      <>
        <Header />
        <div className="viewHeader">
          <Link href={"/home"} className="goBack_btn">
            <Icon icon="pajamas:arrow-left" />
            <div className="goBack_txt">Back</div>
          </Link>

          <div className="actionIcons">
            <div className="actionIcon edit" onClick={setEditCardActive}>
              <Icon icon="akar-icons:pencil" />
              {"Edit"}
            </div>
            <div className="actionIcon share">
              <Icon icon="tdesign:share" />
              {"Share"}
            </div>
            <div className="actionIcon delete">
              <Icon icon="tabler:trash" />
              {"Delete"}
            </div>
          </div>
        </div>

        {isEditLicenseActive && (
          <EditLicense
            setIsEditLicenseActive={setIsEditLicenseActive}
            Title={cardData && cardData.Title}
            IssueDate={cardData && cardData.IssueDate}
            ExpiryDate={cardData && cardData.ExpiryDate}
            Number={cardData && cardData.Number}
            State={cardData && cardData.State}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}
        {isEditCeuActive && (
          <EditCeu
            setIsEditCeuActive={setIsEditCeuActive}
            Title={cardData && cardData.Title}
            Completion_Date={cardData && cardData.Completion_Date}
            Name={cardData && cardData.Name}
            Number_Of_Contact_Hour={cardData && cardData.Number_Of_Contact_Hour}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}
        {isEditCertActive && (
          <EditCert
            setIsEditCertActive={setIsEditCertActive}
            Title={cardData && cardData.Title}
            IssueDate={cardData && cardData.IssueDate}
            ExpiryDate={cardData && cardData.ExpiryDate}
            Number={cardData && cardData.Number}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}
        {isEditEduActive && (
          <EditEdu
            setIsEditEduActive={setIsEditEduActive}
            Title={cardData && cardData.Title}
            Degree={cardData && cardData.Degree}
            GraduationDate={cardData && cardData.GraduationDate}
            Field={cardData && cardData.Field}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}
        {isEditVaccineActive && (
          <EditVaccine
            setIsEditVaccineActive={setIsEditVaccineActive}
            Title={cardData && cardData.Title}
            IssueDate={cardData && cardData.IssueDate}
            ExpiryDate={cardData && cardData.ExpiryDate}
            LotNumber={cardData && cardData.LotNumber}
            Manufacturer={cardData && cardData.Manufacturer}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
            collection={collection}
          />
        )}
        {isEditTravelActive && (
          <EditTravel
            setIsEditTravelActive={setIsEditTravelActive}
            Title={cardData && cardData.Title}
            IssueDate={cardData && cardData.issueDate}
            ExpiryDate={cardData && cardData.expiryDate}
            documentNumber={cardData && cardData.documentNumber}
            PlaceOfIssue={cardData && cardData.placeOfIssue}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            Country={cardData && cardData.Country}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}
        {isEditOthersActive && (
          <EditOthers
            setIsEditOthersActive={setIsEditOthersActive}
            Title={cardData && cardData.Title}
            IssueDate={cardData && cardData.IssueDate}
            ExpiryDate={cardData && cardData.ExpiryDate}
            Number={cardData && cardData.Number}
            PrivateNote={cardData && cardData.PrivateNote}
            FileDownloadUrl={cardData && cardData.FileDownloadUrl}
            docId={id}
            onRefetch={fetchCardData}
          />
        )}

        <div className="viewCard-cont">
          <div className="viewCertCard">
            <div className="viewCertCard_header">
              <div className="bgCont">
                <Image
                  src={`/images/${collection}.png`}
                  height={500}
                  width={500}
                  alt="bg"
                  className="credential_bg"
                />
              </div>
              <div className={`glass_viewCert ${collection}`}>
                <div className="viewCert_name">
                  {cardData && cardData.Title}
                </div>
                <div className="viewCert_subtitle">{collection}</div>
              </div>
            </div>

            {/* this is the information section */}
            <section className="viewCert_info">
              <section className="viewCert_info">
                {" "}
                {isLicense ? (
                  <>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">License Type</div>
                        <div className="value">
                          {cardData && cardData.Title === ""
                            ? "Null"
                            : cardData && cardData.Title}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">License Number</div>
                        <div className="value">
                          {cardData && cardData.Number === ""
                            ? "Null"
                            : cardData && cardData.Number}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">State</div>
                        <div className="value">
                          {cardData && cardData.State === ""
                            ? "Null"
                            : cardData && cardData.State}
                        </div>
                      </div>
                    </section>
                    {/* this is the expiration section */}
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Issue Date</div>
                        <div className="value">
                          {cardData && cardData.IssueDate === ""
                            ? "Null"
                            : cardData && cardData.IssueDate}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Expiration Date</div>
                        <div className="value">
                          {cardData && cardData.ExpiryDate === ""
                            ? "Null"
                            : cardData && cardData.ExpiryDate}
                        </div>
                      </div>
                    </section>
                  </>
                ) : isCertificate ? (
                  <>
                    <div className="infoSect">
                      <div className="title">{"Credential Record Number"}</div>
                      <div className="value">
                        {cardData && cardData.Number === ""
                          ? "Null"
                          : cardData && cardData.Number}
                      </div>
                    </div>
                    {/* this is the expiration section */}
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Issue Date</div>
                        <div className="value">
                          {cardData && cardData.IssueDate === ""
                            ? "Null"
                            : cardData && cardData.IssueDate}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Expiration Date</div>
                        <div className="value">
                          {cardData && cardData.ExpiryDate === ""
                            ? "Null"
                            : cardData && cardData.ExpiryDate}
                        </div>
                      </div>
                    </section>
                  </>
                ) : isEdu ? (
                  <>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Degree</div>
                        <div className="value">
                          {cardData && cardData.Degree === ""
                            ? "Null"
                            : cardData && cardData.Degree}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Field of study</div>
                        <div className="value">
                          {cardData && cardData.Field === ""
                            ? "Null"
                            : cardData && cardData.Field}
                        </div>
                      </div>
                    </section>
                    <div className="infoSect">
                      <div className="title">{"Graduation Date"}</div>
                      <div className="value">
                        {cardData && cardData.GraduationDate === ""
                          ? "Null"
                          : cardData && cardData.GraduationDate}
                      </div>
                    </div>
                  </>
                ) : isVaccine ? (
                  <>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Vaccine Manufacturer</div>
                        <div className="value">
                          {cardData && cardData.Manufacturer === ""
                            ? "Null"
                            : cardData && cardData.Manufacturer}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Lot Number</div>
                        <div className="value">
                          {cardData && cardData.LotNumber === ""
                            ? "Null"
                            : cardData && cardData.LotNumber}
                        </div>
                      </div>
                    </section>
                    <div className="infoSect">
                      <div className="title">{"Issue Date"}</div>
                      <div className="value">
                        {cardData && cardData.IssueDate === ""
                          ? "Null"
                          : cardData && cardData.IssueDate}
                      </div>
                    </div>
                  </>
                ) : isTravel ? (
                  <>
                    <div className="infoSect">
                      <div className="title">Country</div>
                      <div className="value">
                        {cardData && cardData.Country === ""
                          ? "Null"
                          : cardData && cardData.Country}
                      </div>
                    </div>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Place of Issue </div>
                        <div className="value">
                          {cardData && cardData.placeOfIssue === ""
                            ? "Null"
                            : cardData && cardData.placeOfIssue}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Passport Number</div>
                        <div className="value">
                          {cardData && cardData.documentNumber === ""
                            ? "Null"
                            : cardData && cardData.documentNumber}
                        </div>
                      </div>
                    </section>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Issue Date </div>
                        <div className="value">
                          {cardData && cardData.issueDate === ""
                            ? "Null"
                            : cardData && cardData.issueDate}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Expiration Date</div>
                        <div className="value">
                          {cardData && cardData.expiryDate === ""
                            ? "Null"
                            : cardData && cardData.expiryDate}
                        </div>
                      </div>
                    </section>
                  </>
                ) : isCEU ? (
                  <>
                    <div className="infoSect">
                      <div className="title">{"Provider's"}Name</div>
                      <div className="value">
                        {cardData && cardData.Name === ""
                          ? "Null"
                          : cardData && cardData.Name}
                      </div>
                    </div>
                    <div className="infoSect">
                      <div className="title">Number of Contact Hour</div>
                      <div className="value">
                        {cardData && cardData.Number_Of_Contact_Hour === ""
                          ? "Null"
                          : cardData && cardData.Number_Of_Contact_Hour}
                      </div>
                    </div>
                    <div className="infoSect">
                      <div className="title">Completion Date</div>
                      <div className="value">
                        {cardData && cardData.Completion_Date === ""
                          ? "Null"
                          : cardData && cardData.Completion_Date}
                      </div>
                    </div>
                  </>
                ) : isOthers ? (
                  <>
                    <div className="infoSect">
                      <div className="title">Credential Record Number</div>
                      <div className="value">
                        {cardData && cardData.Number === ""
                          ? "Null"
                          : cardData && cardData.Number}
                      </div>
                    </div>
                    <section className="flex_3">
                      <div className="infoSect">
                        <div className="title">Issue Date</div>
                        <div className="value">
                          {cardData && cardData.IssueDate === ""
                            ? "Null"
                            : cardData && cardData.IssueDate}
                        </div>
                      </div>
                      <div className="infoSect">
                        <div className="title">Expiry Date Date</div>
                        <div className="value">
                          {cardData && cardData.ExpiryDate === ""
                            ? "Null"
                            : cardData && cardData.ExpiryDate}
                        </div>
                      </div>
                    </section>
                  </>
                ) : null}
              </section>
            </section>
            <section className="certImage_section">
              <div className="Certimg">
                <div className="f-or-b">
                  <Link
                    href={`${cardData && cardData.FileDownloadUrl}`}
                    target="_blank"
                  >
                    View File
                  </Link>
                </div>
                <div className="certImg_cont">
                  <embed
                    src={`${cardData && cardData.FileDownloadUrl}`}
                    type="application/pdf"
                    width="100%"
                    height="300px"
                  />
                </div>
              </div>
            </section>

            <div className="Privatenote">
              <div className="title">Private Note</div>
              <div className="value">{cardData && cardData.PrivateNote}</div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ViewCert;

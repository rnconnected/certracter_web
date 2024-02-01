"use client";
import React from "react";
import Header from "@/components/dashboard/header";
import "@/styles/dashboard/addCert.css";
import "@/styles/dashboard/addLicense.css";
import AddImage from "@/components/dashboard/addImage";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";

const AddTravel = () => {
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
              <input type="radio" name="trvaelDoc" id="passport" />
              <label htmlFor="passport">Passport</label>
            </span>
            <span>
              <input type="radio" name="trvaelDoc" id="Driver_license" />
              <label htmlFor="Driver_license">{"Driver's License"}</label>
            </span>
          </div>
          {/* this is the card input section */}
          <div className="cardInput_cont">
            {/* this is the name section */}
            <section className="name_section">
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Country</label>
                <input type="text" className="License_inputs" />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Place of Issue</label>
                <input type="text" className="License_inputs" />
              </div>
              <div className="addLicense_Inputs1">
                <label htmlFor="name">Passport Number</label>
                <input type="text" className="License_inputs" />
              </div>
            </section>
            {/* end of the name section */}

            {/* this is the date section */}
            <section className="date_section">
              <div className="addLicense_inputs2">
                <label htmlFor="name">Issue date (optional)</label>
                <input type="date" className="License_inputs" />
              </div>
              <div className="addLicense_inputs2">
                <label htmlFor="name">Expiry date (optional)</label>
                <input type="date" className="License_inputs" />
              </div>
            </section>
            {/* end of the date section */}

            {/* the reminder date section */}
            <section className="reminderdate_section">
              <div className="addLicense_inputs3">
                <label htmlFor="name">First reminder</label>
                <input type="date" className="License_inputs " />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Second reminder</label>
                <input type="date" className="License_inputs " />
              </div>
              <div className="addLicense_inputs3">
                <label htmlFor="name">Final reminder</label>
                <input type="date" className="License_inputs " />
              </div>
            </section>
            {/* end of the reminder date section */}
          </div>

          {/* this is the upload photo section */}
          <h2>Upload Photo</h2>
          <section className="uploadPhoto_cont">
            <div className="uploadPhoto_el">
              <div className="upload_front">Front</div>
              <AddImage id={"front_imgTravel"} />
            </div>
            <div className="uploadPhoto_el">
              <div className="upload_back">Back</div>
              <AddImage id={"back_imgTravel"} />
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
            ></textarea>
          </section>
          <div className="saveBtn">Save Credential</div>
        </div>
      </div>
    </>
  );
};

export default AddTravel;

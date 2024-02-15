import React, { useState } from "react";
import "@/styles/dashboard/editProfile.css";
import { Icon } from "@iconify/react/dist/iconify.js";

const EditProfile = ({ userDataObject }) => {
  const [firstName, setFirstName] = useState(userDataObject?.firstName);
  return (
    <>
      <div className="invi_glass">
        <div className="editProfile_card">
          <div className="editProfile_card_header">
            <div className="cancel">
              <Icon icon="fluent-mdl2:cancel" />
            </div>
            <div className="header_title">Edit Profile</div>
            <div className="savebtn">Save</div>
          </div>
          <div className="editProfile_body">
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setFirstName(event.target.value)}
                  value={firstName}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="inputs "
                  //   onChange={(event) => setExpiryDate(event.target.value)}
                  //   value={expiryDate}
                />
              </div>
            </section>

            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="inputs "
                  //   onChange={(event) => setIssueDate(event.target.value)}
                  //   value={issueDate}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Phone No</label>
                <input
                  type="phone"
                  className="inputs "
                  //   onChange={(event) => setExpiryDate(event.target.value)}
                  //   value={expiryDate}
                />
              </div>
            </section>
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Date Of Birth</label>
                <input
                  type="date"
                  className="inputs "
                  //   onChange={(event) => setIssueDate(event.target.value)}
                  //   value={issueDate}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">State</label>
                <input
                  type="text"
                  className="inputs "
                  //   onChange={(event) => setExpiryDate(event.target.value)}
                  //   value={expiryDate}
                />
              </div>
            </section>
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">City</label>
                <input
                  type="text"
                  className="inputs "
                  //   onChange={(event) => setIssueDate(event.target.value)}
                  //   value={issueDate}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Zip Code</label>
                <input
                  type="text"
                  className="inputs "
                  //   onChange={(event) => setExpiryDate(event.target.value)}
                  //   value={expiryDate}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

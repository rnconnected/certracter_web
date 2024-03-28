import React, { useState } from "react";
import "@/styles/dashboard/editProfile.css";
import { Icon } from "@iconify/react/dist/iconify.js";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "@/app/firebase/config";

const EditProfile = ({
  setEditProfile,
  userId,
  firstName,
  lastName,
  email,
  phone,
  dob,
  city,
  state,
  zipCode,
}) => {
  const [editFirstName, setEditFirstName] = useState(firstName);
  const [editLastName, setEditLastName] = useState(lastName);
  const [editEmail, setEditEmail] = useState(email);
  const [editPhone, setEditPhone] = useState(phone);
  const [editDob, setEditDob] = useState(dob);
  const [editCity, setEditCity] = useState(city);
  const [editState, setEditState] = useState(state);
  const [editZipCode, setEditZipCode] = useState(zipCode);

  const editUserData = async (userId) => {
    try {
      const userDocRef = doc(firestore, "users", userId);

      await updateDoc(userDocRef, {
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
        phone: editPhone,
        dob: editDob,
        city: editCity,
        state: editState,
        zipCode: editZipCode,
      }).then(() => {
        alert("Profile updated successfully");
        setEditProfile(false);
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <>
      <div className="invi_glass">
        <div className="editProfile_card">
          <div className="editProfile_card_header">
            <div className="cancel" onClick={() => setEditProfile(false)}>
              <Icon icon="fluent-mdl2:cancel" />
            </div>
            <div className="header_title">Edit Profile</div>
            <div className="savebtn" onClick={() => editUserData(userId)}>
              Save
            </div>
          </div>
          <div className="editProfile_body">
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">First name</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setEditFirstName(event.target.value)}
                  value={editFirstName}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Last name</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setEditLastName(event.target.value)}
                  value={editLastName}
                />
              </div>
            </section>

            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Email</label>
                <input
                  type="email"
                  className="inputs "
                  onChange={(event) => setEditEmail(event.target.value)}
                  value={editEmail}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Phone No</label>
                <input
                  type="phone"
                  className="inputs "
                  onChange={(event) => setEditPhone(event.target.value)}
                  value={editPhone}
                />
              </div>
            </section>
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">Date Of Birth</label>
                <input
                  type="date"
                  className="inputs "
                  onChange={(event) => setEditDob(event.target.value)}
                  value={editDob}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">State</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setEditState(event.target.value)}
                  value={editState}
                />
              </div>
            </section>
            <section className="date_section">
              <div className="addCert_Inputs2">
                <label htmlFor="name">City</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setEditCity(event.target.value)}
                  value={editCity}
                />
              </div>
              <div className="addCert_Inputs2">
                <label htmlFor="name">Zip Code</label>
                <input
                  type="text"
                  className="inputs "
                  onChange={(event) => setEditZipCode(event.target.value)}
                  value={editZipCode}
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

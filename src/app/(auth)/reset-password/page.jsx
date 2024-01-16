"use client";
import React, { useState } from "react";
import "@/styles/forgetPassword.css";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleChange1 = (e) => {
    setNewPassword(e.target.value);
  };

  const handleChange2 = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  return (
    <>
      <div className="fgtContainer">
        <div className="backgroundfgt">
          <div className="topfgt"></div>
          <div className="bottomfgt"></div>
        </div>
        <div className="fgtCard">
          <h1>Reset Password</h1>
          <div className="fgtEmailCont" style={{ margin: ".5rem 0" }}>
            {newPassword !== "" && <label>New Password</label>}
            <input
              type="password"
              placeholder="New password"
              className="fgt_input"
              value={newPassword}
              onChange={handleChange1}
            />
          </div>
          <div className="fgtEmailCont" style={{ margin: "1rem 0" }}>
            {confirmNewPassword !== "" && <label>Re-enter Password</label>}
            <input
              type="password"
              placeholder="Re-enter password"
              className="fgt_input"
              value={confirmNewPassword}
              onChange={handleChange2}
            />
          </div>

          <div className="fgtSubmit">Submit</div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;

import React, { useState } from "react";
import "@/styles/popup.css";

const Popup = ({ closePopup }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);

      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzn6TUHZg6gccL76DdFv5K4xJmw8Xd_im4f39kEVy2F9tw2ckRJZwVYTrcwkz2WdK2V/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            "first-name": fname,
            "last-name": lname,
            email: email,
          }).toString(),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Handle error or display error message
        console.error("Form submission failed");
      }
    } catch (error) {
      console.error("An error occurred during form submission", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="popup_cont">
        {isSubmitted ? (
          // Display success message
          <div className="success_message">
            Thank you for submitting the form! We will be in touch soon.
          </div>
        ) : (
          // Display form
          <div className="popup_message">
          <div className="msg_h">
            Thank you for expressing interest in CerTracker!
          </div>
          <div className="msg_b">
            At this time, CerTracker is an invite-only platform, offering
            exclusive early access to a select group of users. To join our
            waiting list and secure your invitation, please sign up. Invites are
            sent out as spaces become available, ensuring that each new member
            receives the attention and support they need to make the most of
            CerTracker.
          </div>
          <div className="msg_closingMsg">
            We appreciate your understanding and look forward to welcoming you
            to CerTracker soon!
          </div>
          <div className="regardFrom">
            <span>Warm regards,</span>
            <span>The CerTracker Team.</span>
          </div>
        </div>
        )}

        {/* Form section */}
        <form onSubmit={handleSubmit} className="popupForm" method="post">
          <div className="closeCont">
            <div className="closePopUp" onClick={closePopup}>
              Close
            </div>
          </div>
          {isSubmitted ? null : (
            <div className="popupForm_h">Register to be a Beta Tester</div>
          )}
          {isSubmitted ? null : (
            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                name="first-name"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className={fname ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={fname || fname === "" ? "" : "rest"}
                id="contactLabel"
              >
                First Name
              </label>
            </div>
          )}
          {isSubmitted ? null : (
            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                name="last-name"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className={lname ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={lname || lname === "" ? "" : "rest"}
                id="contactLabel"
              >
                Last Name
              </label>
            </div>
          )}
          {isSubmitted ? null : (
            <div className="formInput">
              <input
                id="contactInput"
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={email ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={email || email === "" ? "" : "rest"}
                id="contactLabel"
              >
                Email
              </label>
            </div>
          )}
          {isSubmitted ? null : (
            <div className="popupSubmit_cont">
              <button type="submit" className="popupSubmit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default Popup;

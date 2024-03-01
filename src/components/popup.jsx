import React, { useState } from "react";
import "@/styles/popup.css";

const Popup = ({ closePopup }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
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
            "phone-number": phone,
            email: email,
          }).toString(),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
      } else {
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
      {!isSubmitted ? (
        <div className="popup_cont">
          <div className="popup_message">
            <div className="msg_h">
              Thank you for expressing interest in CerTracker!
            </div>
            <div className="msg_b">
              At this time, CerTracker is an invite-only platform, offering
              exclusive early access to a select group of users. To join our
              waiting list and secure your invitation, please sign up. Invites
              are sent out as spaces become available, ensuring that each new
              member receives the attention and support they need to make the
              most of CerTracker.
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

          <div className="smallScreen_msg">
            <div className="closeCont_small">
              <div className="closePopUp" onClick={closePopup}>
                Close
              </div>
            </div>
            <div className="msg_h">
              Thank you for expressing interest in CerTracker!
            </div>
            <div className="msg_b">
              CerTracker is presently in an exclusive invite-only phase,
              allowing a select few the opportunity for early access to our
              innovative platform. Join the queue to get invited as spots become
              available.
            </div>
            <div className="msg_closingMsg">
              {
                "We're stoked you're interested and can't thank you enough for your patience!"
              }
            </div>
            <div className="regardFrom">
              <span>Catch you on the flip side,,</span>
              <span>The CerTracker Team.</span>
            </div>
          </div>

          {/* Form section */}
          <form onSubmit={handleSubmit} className="popupForm" method="post">
            <div className="closeCont">
              <div className="closePopUp" onClick={closePopup}>
                Close
              </div>
            </div>
            <div className="popupForm_h">Register to Join the Queue</div>
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

            <div className="formInput">
              <input
                id="contactInput"
                type="tel"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={phone ? "active" : ""}
              />
              <label
                htmlFor="fullNameInput"
                className={phone || phone === "" ? "" : "rest"}
                id="contactLabel"
              >
                Phone Number
              </label>
            </div>

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
            <div className="popupSubmit_cont">
              <button
                type="submit"
                className="popupSubmit"
                disabled={isLoading}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="success_message">
          <div className="cancelBtn_popup">
            <span onClick={closePopup}>close</span>
          </div>
          <span>
            Thank you for submitting the form! We will be in touch soon.
          </span>
        </div>
      )}
    </>
  );
};

export default Popup;

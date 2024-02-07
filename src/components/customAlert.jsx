// import React from "react";

// const CustomAlert = ({ setShowAlert }) => {
//   return (
//     <>
//       <div className="alert_box" style={Style.alert_box}>
//         <span className="alertMsg">{"message"}</span>
//         <span className="alertCloseBtn" onClick={() => setShowAlert(false)}>
//           X
//         </span>
//       </div>
//     </>
//   );
// };

// StyleSheet.Style = {
//   alert_box: {
//     border: "1px solid black",
//     boxShadow: "0 0  3px gray",
//   },
// };

// export default CustomAlert;

import React from "react";

const CustomAlert = ({ setShowAlert, message }) => {
  const alertBoxStyle = {
    boxShadow: "0 0 3px gray",
    padding: "10px",
    backgroundColor: "whitesmoke",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "fit-content",
  };

  const closeBtnStyle = {
    cursor: "pointer",
    marginLeft: "10px",
  };

  return (
    <>
      <div className="alert_box" style={alertBoxStyle}>
        <span className="alertMsg">{message}</span>
        <span
          className="alertCloseBtn"
          style={closeBtnStyle}
          onClick={() => setShowAlert(false)}
        >
          X
        </span>
      </div>
    </>
  );
};

export default CustomAlert;

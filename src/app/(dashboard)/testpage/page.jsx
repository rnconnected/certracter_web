// "use client";
// import { useState, useEffect } from "react";
// // import { CircularProgress, Typography } from "@material-ui/core";
// // import CategoryContainer from "../components/home_components/category_container/CategoryContainer";
// // import AuthenticationService from "../auth/authService";
// // import { FirebaseFirestore } from "../firebase"; // Assuming you're using Firebase for Firestore
// import { firestore } from "@/app/firebase/config";


// const AllPage = () => {
//   const defaultCategoryColor = "#F5415F";
//   const defaultCategoryImagePath = "/assets/images/icons/4.png";

//   const [userData, setUserData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const userId = AuthenticationService.getCurrentUserId();

//         if (userId) {
//           const snapshots = await Promise.all([
//             FirebaseFirestore.collection("Certification")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("License")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("Education")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("Vaccination")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("Travel")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("CEU")
//               .where("userId", "==", userId)
//               .get(),
//             FirebaseFirestore.collection("Others")
//               .where("userId", "==", userId)
//               .get(),
//           ]);
//           let userData = [];
//           snapshots.forEach((snapshot) => {
//             userData = userData.concat(
//               snapshot.docs.map((doc) => ({
//                 ...doc.data(),
//                 tableName: doc.ref.parent.id,
//                 timestamp: doc.data().timestamp,
//               }))
//             );
//           });
//           setUserData(userData);
//           setLoading(false);
//         } else {
//           throw new Error("User not authenticated!");
//         }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);

// //   if (loading) {
// //     return <CircularProgress />;
// //   }

// //   if (!userData.length) {
// //     return (
// //       <Typography variant="h5" color="textSecondary" align="center">
// //         You have not added any credentials
// //       </Typography>
// //     );
// //   }

//   return (
//     <div>
//       {userData.map((credentialsId) => {
//         let categoryColor = defaultCategoryColor;
//         let categoryImagePath = defaultCategoryImagePath;

//         switch (credentialsId.tableName) {
//           case "Certification":
//             categoryColor = "#8A6C0A";
//             categoryImagePath = "/assets/images/icons/1.png";
//             break;
//           case "License":
//             categoryColor = "#591A8F";
//             categoryImagePath = "/assets/images/icons/2.png";
//             break;
//           case "Education":
//             categoryColor = "#0A8A17";
//             categoryImagePath = "/assets/images/icons/3.png";
//             break;
//           case "Vaccination":
//             categoryColor = "#F5415F";
//             categoryImagePath = "/assets/images/icons/4.png";
//             break;
//           case "Travel":
//             categoryColor = "#61B7F6";
//             categoryImagePath = "/assets/images/icons/5.png";
//             break;
//           case "CEU":
//             categoryColor = "#789D1C";
//             categoryImagePath = "/assets/images/icons/6.png";
//             break;
//           case "Others":
//             categoryColor = "#691B27";
//             categoryImagePath = "/assets/images/icons/7.png";
//             break;
//           default:
//             break;
//         }

//         return
//         //   <CategoryContainer
//         //     key={credentialsId.title}
//         //     title={credentialsId.title}
//         //     category={credentialsId.tableName}
//         //     imagePath={categoryImagePath}
//         //     color={categoryColor}
//         //   />
//         ;
//       })}
//     </div>
//   );
// };

// export default AllPage;


// useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         // const userId = user.uid;
//         console.log(user);

//   if (userId) {
//     const snapshots = await Promise.all([
//       firestore
//         .collection("Certification")
//         .where("userId", "==", userId)
//         .get(),
//       firestore.collection("License").where("userId", "==", userId).get(),
//       firestore
//         .collection("Education")
//         .where("userId", "==", userId)
//         .get(),
//       firestore
//         .collection("Vaccination")
//         .where("userId", "==", userId)
//         .get(),
//       firestore.collection("Travel").where("userId", "==", userId).get(),
//       firestore.collection("CEU").where("userId", "==", userId).get(),
//       firestore.collection("Others").where("userId", "==", userId).get(),
//     ]);
//     let userData = [];
//     snapshots.forEach((snapshot) => {
//       userData = userData.concat(
//         snapshot.docs.map((doc) => ({
//           ...doc.data(),
//           tableName: doc.ref.parent.id,
//           timestamp: doc.data().timestamp,
//         }))
//       );
//     });
//     setUserDocs(userData);
//   } else {
//     throw new Error("User not authenticated!");
//   }
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     fetchUserData();
//   }, []);
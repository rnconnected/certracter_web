import { firestore } from "@/app/firebase/config";
import { doc, getDoc } from "firebase/firestore";

const getUserData = async (userId) => {
  try {
    const userDocRef = doc(firestore, "users", userId);

    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      return userDocSnapshot.data();
    } else {
      console.error("User data not found.");
      return "user data not found";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default getUserData;

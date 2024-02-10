import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const storage = getStorage(app);

const fetchUploadedImageURL = async (user) => {
  try {
    if (!user) {
      console.error("User not logged in");
      return;
    }

    const imageRef = ref(storage, `images/${user.uid}`);
    const imageList = await listAll(imageRef);

    const sortedImages = imageList.items.sort(
      (a, b) => b.timeCreated - a.timeCreated
    );

    if (sortedImages.length === 0) {
      console.error("No images found for the user");
      return;
    }

    const latestImage = sortedImages[0];
    const downloadURL = await getDownloadURL(latestImage);
    return downloadURL;
    //  setUploadedImageURL(downloadURL);
  } catch (error) {
    console.error("Error fetching uploaded image:", error);
  }
};

export { auth, storage };

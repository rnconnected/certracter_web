import { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { onAuthStateChanged } from "firebase/auth";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import { auth, storage } from "@/app/firebase/config";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [downloadURL, setDownloadURL] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
        setCookie(null, "token", authUser.getIdToken(), {
          path: "/",
          maxAge: 3600,
        });
      } else {
        setUser(null);
        destroyCookie(null, "token");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading, downloadURL };
}

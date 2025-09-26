import React, { useEffect, useState,  } from "react";
import type { ReactNode } from "react";
import { 
  FacebookAuthProvider
} from "firebase/auth";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import app from "../firebase.config";

import { AuthContext } from "./AuthContext";
import type { User } from "./AuthContext";
import type { AuthContextType } from "./AuthContext";
import useAxiosPublic from "@/Hooks/axiosPublic";

// Define props interface
interface AuthProviderProps {
  children: ReactNode;
}

const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const googleProvider = new GoogleAuthProvider();
  const axiosPublic = useAxiosPublic();

  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email: string, password: string) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const facebookSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = (name: string, photo: string) => {
    if (!auth.currentUser) {
      throw new Error("No user is currently signed in");
    }
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser as User);
      if (currentUser) {
        // get token and store in client
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
          if (res.data?.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        }).catch((error) => {
          console.error("Token generation failed:", error);
          setLoading(false);
        });
      } else {
        // remove token
        localStorage.removeItem("access-token");
        setLoading(false);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [axiosPublic]);

  const authInfo: AuthContextType = {
    user,
    loading,
    createUser,
    logIn,
    facebookSignIn,
    logOut,
    updateUserProfile,
    googleSignIn,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
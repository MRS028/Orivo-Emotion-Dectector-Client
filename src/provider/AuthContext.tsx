import { createContext } from "react";
import { type User as FirebaseUser } from "firebase/auth";
import type { UserCredential } from "firebase/auth";

// Define user type
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface User extends FirebaseUser {
  // You can extend with additional properties if needed
}

// Define auth context type
export interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
  logIn: (email: string, password: string) => Promise<UserCredential>;
  facebookSignIn: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
  updateUserProfile: (name: string, photo: string) => Promise<void>;
  googleSignIn: () => Promise<UserCredential>;
}

// Create context with proper type
export const AuthContext = createContext<AuthContextType | null>(null);
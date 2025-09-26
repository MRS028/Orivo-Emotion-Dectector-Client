import { AuthContext, type AuthContextType } from "@/provider/AuthContext";
import { useContext } from "react"; // Adjust the path as needed

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
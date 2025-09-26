// ProtectedTextInput.tsx
import React from "react";
import PrivateRoute from "./PrivateRoute";
import Profile from "@/pages/profile/Profile";

const ProtectedProfile: React.FC = () => (
  <PrivateRoute>
    <Profile />
  </PrivateRoute>
);

export default ProtectedProfile;

// ProtectedTextInput.tsx
import React from "react";
import PrivateRoute from "./PrivateRoute";
import History from "@/pages/profile/History";

const ProtectedHistory: React.FC = () => (
  <PrivateRoute>
    <History />
  </PrivateRoute>
);

export default ProtectedHistory;

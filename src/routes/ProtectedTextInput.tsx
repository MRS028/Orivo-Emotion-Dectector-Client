// ProtectedTextInput.tsx
import React from "react";
import TextInput from "@/pages/TextResponse/TextInput";
import PrivateRoute from "./PrivateRoute";

const ProtectedTextInput: React.FC = () => (
  <PrivateRoute>
    <TextInput />
  </PrivateRoute>
);

export default ProtectedTextInput;

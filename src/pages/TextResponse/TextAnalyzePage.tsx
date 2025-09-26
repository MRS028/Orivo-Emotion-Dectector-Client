/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Navbar from "../shared/Navbar";
import TextResponseBox from "./TextInput";
import Footer from "../shared/Footer";
import { useAuth } from "@/Hooks/useAuth";


const TextAnalyzePage: React.FC = () => {
  
  const { user } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="flex-grow py-12 px-4">
        <h2 className="max-w-3xl mx-auto text-2xl font-semibold mb-6">
          Text Emotion Detection
        </h2>
        <TextResponseBox
          placeholder="Type a sentence to analyze emotions..."
          maxLength={1500}
          autoClear={false}
          // Pass user as prop if TextResponseBox needs it
          user={user}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TextAnalyzePage;
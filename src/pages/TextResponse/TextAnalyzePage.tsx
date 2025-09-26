import React from "react";
import Navbar from "../shared/Navbar";
import TextResponseBox from "./TextInput";
import Footer from "../shared/Footer";

const TextAnalyzePage: React.FC = () => {
  const submitToServer = async (_text: string) => {
    void _text;
    // Replace with your real endpoint & error handling
    // const res = await api.post("/emotion/text", { text });
    // Example response handling:
    // return res.data
    // console.log("server response:", res.data);
  };

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
          onSubmit={submitToServer}
          autoClear={false}
        />
      </main>
      <Footer />
    </div>
  );
};

export default TextAnalyzePage;

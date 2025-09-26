import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">About Orivo</h1>
        <p className="text-gray-600 text-lg mb-10">
          Orivo is a modern AI-powered platform that helps users analyze their emotions, improve productivity, and streamline communication.
          Our mission is to make intelligent tools accessible to everyone, so you can focus on what truly matters.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-10">
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Our Mission</h2>
            <p className="text-gray-600">
              Empower individuals and organizations to harness AI to understand emotions and make better decisions.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Our Vision</h2>
            <p className="text-gray-600">
              To be the leading platform for emotional intelligence tools, trusted by millions of users worldwide.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-indigo-600 mb-2">Our Values</h2>
            <p className="text-gray-600">
              Innovation, Transparency, User-centric design, and Ethical AI development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

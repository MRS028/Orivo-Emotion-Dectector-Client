import React from "react";

const featuresData = [
  {
    title: "Emotion Recognition",
    description: "Detect and analyze user emotions accurately in real-time using our advanced AI algorithms.",
    icon: "😊",
  },
  {
    title: "Analytics Dashboard",
    description: "Track trends, visualize emotional data, and get actionable insights to improve productivity.",
    icon: "📊",
  },
  {
    title: "Secure Cloud Storage",
    description: "Store your data securely with end-to-end encryption and easy access across devices.",
    icon: "☁️",
  },
  {
    title: "Multi-Language Support",
    description: "Use Orivo in multiple languages and reach users globally without any barriers.",
    icon: "🌐",
  },
];

const Features: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Features</h1>
        <p className="text-gray-600 text-lg mb-10">
          Orivo offers a suite of powerful features designed to help you understand emotions and improve productivity.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow text-left"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h2 className="text-xl font-semibold text-indigo-600 mb-2">{feature.title}</h2>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;

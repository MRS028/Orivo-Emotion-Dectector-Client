import React from "react";
import { BrainCircuit, LayoutDashboard, Lock, Globe, Zap, Shield, Users, BarChart3 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useScrollUp from "@/Hooks/useScrollUp";

// Updated feature data with vibrant colors and professional icons
const featuresData = [
  {
    icon: <BrainCircuit className="w-12 h-12" />,
    title: "Advanced Emotion Recognition",
    description: "Our fine-tuned AI model accurately identifies nuanced emotions from text, providing deeper insights than ever before.",
    gradient: "from-purple-500 to-pink-500",
    bgGradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200"
  },
  {
    icon: <LayoutDashboard className="w-12 h-12" />,
    title: "Insightful Analytics",
    description: "Visualize emotional trends and patterns through a clean, interactive dashboard to make data-driven decisions.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    borderColor: "border-blue-200"
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "Enterprise-Grade Security",
    description: "Your data is protected with end-to-end encryption and robust security protocols, ensuring complete privacy.",
    gradient: "from-emerald-500 to-green-500",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200"
  },
  {
    icon: <Globe className="w-12 h-12" />,
    title: "Global Language Support",
    description: "Analyze text from multiple languages with high accuracy, breaking down communication barriers effortlessly.",
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    borderColor: "border-orange-200"
  },
  {
    icon: <Zap className="w-12 h-12" />,
    title: "Real-time Processing",
    description: "Instant emotion analysis with lightning-fast response times, perfect for live applications and chatbots.",
    gradient: "from-amber-500 to-yellow-500",
    bgGradient: "from-amber-50 to-yellow-50",
    borderColor: "border-amber-200"
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Team Collaboration",
    description: "Share insights and collaborate with your team in real-time for better decision-making.",
    gradient: "from-indigo-500 to-violet-500",
    bgGradient: "from-indigo-50 to-violet-50",
    borderColor: "border-indigo-200"
  },
  {
    icon: <BarChart3 className="w-12 h-12" />,
    title: "Custom Metrics",
    description: "Create personalized emotional intelligence metrics tailored to your specific use case.",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
    borderColor: "border-rose-200"
  },
  {
    icon: <Lock className="w-12 h-12" />,
    title: "GDPR Compliant",
    description: "Fully compliant with global data protection regulations, ensuring your peace of mind.",
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50",
    borderColor: "border-teal-200"
  },
];

const Features: React.FC = () => {
    useScrollUp();
  return (
    <div className="lg:max-w-7xl mx-auto py-20 lg:py-28 bg-gradient-to-br  dark:from-slate-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Powerful Features
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent mb-6">
            Advanced Emotional Intelligence Platform
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Experience the future of emotion analysis with our comprehensive suite of AI-powered tools designed for accuracy and scalability.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden border-2 ${feature.borderColor} bg-gradient-to-br ${feature.bgGradient} dark:bg-slate-800/50 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105`}
            >
              {/* Gradient overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              
              <CardHeader className="flex flex-col items-start space-y-4 pb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
              
              {/* Animated border effect */}
              <div className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${feature.gradient} group-hover:w-full transition-all duration-500`} />
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-2xl mx-auto text-center mt-16">
          <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 dark:border-slate-700 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Transform Your Emotional Intelligence?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Join thousands of teams using Orivo to make data-driven emotional decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                Start Free Trial
              </button>
              <button className="px-8 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 rounded-full font-semibold hover:border-blue-500 dark:hover:border-blue-400 transition-all">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
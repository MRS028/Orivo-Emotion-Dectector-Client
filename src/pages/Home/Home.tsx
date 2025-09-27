import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useScrollUp from "@/Hooks/useScrollUp";
import { FaRegSmileBeam, FaChartLine, FaShieldAlt, FaRocket } from "react-icons/fa";
import { MdImageSearch, MdOutlineAudiotrack, MdSpeed, MdPsychology } from "react-icons/md";
import { IoStatsChart, IoPeople } from "react-icons/io5";
import { Link } from "react-router-dom";

const Home = () => {
  useScrollUp();
  
  const features = [
    {
      icon: <FaRegSmileBeam className="text-4xl" />,
      title: "Text Emotion Analysis",
      description: "Advanced NLP models detect subtle emotional cues in written text with 95% accuracy",
      highlights: ["Sentiment analysis", "Emotion classification", "Real-time processing"]
    },
    {
      icon: <MdImageSearch className="text-4xl" />,
      title: "Facial Expression Recognition",
      description: "Computer vision technology analyzes facial micro-expressions and emotional indicators",
      highlights: ["Real-time detection", "Multi-face analysis", "Expression intensity measurement"]
    },
    {
      icon: <MdOutlineAudiotrack className="text-4xl" />,
      title: "Voice Emotion Detection",
      description: "Extract emotional context from speech patterns, tone, and vocal characteristics",
      highlights: ["Tone analysis", "Speech pattern recognition", "Emotional intensity scoring"]
    }
  ];

  const stats = [
    { value: "95%", label: "Accuracy Rate", icon: <MdSpeed className="text-xl" /> },
    { value: "10ms", label: "Response Time", icon: <FaRocket className="text-xl" /> },
    { value: "50K+", label: "Analyses Done", icon: <IoStatsChart className="text-xl" /> },
    { value: "99.9%", label: "Uptime", icon: <FaShieldAlt className="text-xl" /> }
  ];

  const useCases = [
    {
      icon: <MdPsychology className="text-2xl" />,
      title: "Mental Health Support",
      description: "Help therapists monitor patient emotional states through text and voice analysis"
    },
    {
      icon: <IoPeople className="text-2xl" />,
      title: "Customer Service",
      description: "Analyze customer interactions to improve service quality and emotional intelligence"
    },
    {
      icon: <FaChartLine className="text-2xl" />,
      title: "Market Research",
      description: "Gather emotional insights from user feedback and social media interactions"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20 text-center">
        <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm font-semibold">
          🚀 AI-Powered Emotion Detection
        </Badge>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
          Understand Emotions with{" "}
          <span className="text-indigo-600 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Orivo
          </span>
        </h1>
        
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Advanced AI platform for real-time emotion detection from{" "}
          <span className="font-semibold text-indigo-600">text</span>,{" "}
          <span className="font-semibold text-indigo-600">images</span>, and{" "}
          <span className="font-semibold text-indigo-600">audio</span>. 
          Powered by cutting-edge machine learning models with enterprise-grade accuracy.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/text-response">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 rounded-full text-lg font-semibold">
              Start Analyzing Emotions
            </Button>
          </Link>
          <Link to="/about">
            <Button size="lg" variant="outline" className="border-2 border-gray-300 hover:border-indigo-600 text-gray-800 px-8 py-6 rounded-full text-lg font-semibold">
              Learn How It Works ...
            </Button>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-0 shadow-lg bg-white/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex justify-center items-center gap-2 text-indigo-600 mb-2">
                  {stat.icon}
                  <span className="text-3xl font-bold">{stat.value}</span>
                </div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Powerful Emotion Detection Features</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive AI solutions for understanding human emotions across multiple modalities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-fit p-3 bg-indigo-100 text-indigo-600 rounded-full group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {feature.highlights.map((highlight, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-700">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mr-3"></div>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator className="my-8 max-w-4xl mx-auto" />

      {/* Use Cases Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Real-World Applications</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Discover how Orivo is transforming industries with emotional intelligence
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {useCases.map((useCase, index) => (
            <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="mx-auto w-fit p-3 bg-green-100 text-green-600 rounded-full mb-4">
                  {useCase.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{useCase.title}</h3>
                <p className="text-gray-600 text-sm">{useCase.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already using Orivo to understand emotions better
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg" variant="secondary" className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-6 rounded-full text-lg font-semibold">
                Create Free Account
              </Button>
            </Link>
            <Link to="/features">
              <Button size="lg" variant="outline" className="border-2 border-white text-black hover:bg-white/10 px-8 py-6 rounded-full text-lg font-semibold">
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
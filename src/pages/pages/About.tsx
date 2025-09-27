// src/pages/AboutPage.jsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useScrollUp from "@/Hooks/useScrollUp";
import {
  Rocket,
  Eye,
  Gem,
  Linkedin,
  Twitter,
  Users,
  Target,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Alex Johnson",
    role: "Founder & CEO",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Maria Garcia",
    role: "Lead AI Engineer",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704e",
    social: { linkedin: "#", twitter: "#" },
  },
  {
    name: "Sam Chen",
    role: "Head of Product",
    imageUrl: "https://i.pravatar.cc/150?u=a042581f4e29026704f",
    social: { linkedin: "#", twitter: "#" },
  },
];

const stats = [
  { number: "10K+", label: "Active Users", icon: Users },
  { number: "95%", label: "Accuracy Rate", icon: Target },
  { number: "98%", label: "On Time Response", icon: Target },
  { number: "50+", label: "Countries", icon: Heart },
];

const AboutPage = () => {
  
  useScrollUp();
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-15 pb-20 md:pt-40 md:pb-28 text-center bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
            About{" "}
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Orivo
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-blue-100">
            We're revolutionizing emotional intelligence with AI, creating
            meaningful connections between technology and human emotions.
          </p>
        </div>

        {/* Floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-pink-400/20 rounded-full blur-xl"></div>
      </section>

      {/* Mission, Vision, Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Philosophy
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Driving innovation in emotional intelligence through cutting-edge
              AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <Rocket className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-blue-900">
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800/80 leading-relaxed">
                  To democratize emotional intelligence by providing accessible
                  AI tools that help individuals and organizations make more
                  empathetic, data-driven decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <Eye className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-purple-900">
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800/80 leading-relaxed">
                  To create a world where technology enhances human connection,
                  making emotional intelligence a fundamental part of every
                  digital interaction.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group">
              <CardHeader className="items-center text-center">
                <div className="p-4 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                  <Gem className="h-8 w-8" />
                </div>
                <CardTitle className="text-2xl text-amber-900">
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-amber-800/80 leading-relaxed">
                  Innovation, empathy, transparency, and ethical AI development
                  guide everything we do, ensuring technology serves humanity.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={stat.label} className="text-center group">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    index === 0
                      ? "bg-blue-100 text-blue-600"
                      : index === 1
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <stat.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Meet Our Team
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Passionate innovators building the future of emotional
              intelligence technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className="group relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-center border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105"
              >
                <div className="relative inline-block mb-6">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-32 h-32 rounded-full object-cover border-4 border-white/20 group-hover:border-amber-400 transition-colors duration-300"
                  />
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {member.name}
                </h3>
                <p className="text-amber-300 font-medium mb-4">{member.role}</p>
                <p className="text-gray-300 text-sm mb-6">
                  {index === 0 &&
                    "Leading our vision with 10+ years in AI technology"}
                  {index === 1 &&
                    "Expert in machine learning and emotional analytics"}
                  {index === 2 &&
                    "Product strategy and user experience innovation"}
                </p>

                <div className="flex justify-center space-x-4">
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center text-white hover:bg-sky-400 transition-colors"
                  >
                    <Twitter size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-500 to-teal-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Emotional Intelligence?
          </h2>
          <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already making more empathetic
            decisions with Orivo AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/text-response">
              {" "}
              <Button className="px-8 py-3 bg-white text-emerald-600 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                Get Started Free
              </Button>
            </Link>
            <Link to="/contact">
              {" "}
              <Button className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-colors">
                Schedule Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

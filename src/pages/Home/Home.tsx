import { Button } from "@/components/ui/button";
import useScrollUp from "@/Hooks/useScrollUp";
import { FaRegSmileBeam } from "react-icons/fa";
import { MdImageSearch, MdOutlineAudiotrack } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  useScrollUp();
  return (
    <section className="bg-gradient-to-br from-indigo-50 to-white min-h-screen flex flex-col justify-center items-center text-center px-6">
      {/* Hero Section */}
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          Understand Emotions with{" "}
          <span className="text-indigo-600">Orivo</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Real-time AI emotion detection from{" "}
          <span className="font-semibold">text</span>,{" "}
          <span className="font-semibold">images</span>, and{" "}
          <span className="font-semibold">audio</span>.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/text-response">
            {" "}
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full">
              Try Now
            </Button>
          </Link>
          <Button variant="outline" className="px-8 py-3 rounded-full">
            Learn More
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <FaRegSmileBeam className="mx-auto text-indigo-600 text-4xl" />
          <h3 className="mt-4 text-lg font-semibold">Text Analysis</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Detect emotions from written text using NLP models.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <MdImageSearch className="mx-auto text-indigo-600 text-4xl" />
          <h3 className="mt-4 text-lg font-semibold">Image Recognition</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Analyze facial expressions to detect real emotions.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition">
          <MdOutlineAudiotrack className="mx-auto text-indigo-600 text-4xl" />
          <h3 className="mt-4 text-lg font-semibold">Audio Detection</h3>
          <p className="text-gray-600 mt-2 text-sm">
            Extract emotions from voice tone & speech patterns.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;

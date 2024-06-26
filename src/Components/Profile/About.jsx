import aboutpic from "../../assets/about.png";
import { FaLaptop, FaLinkedin } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function About() {
  return (
    <>
      <Navbar />
      <div className="mt-5 mb-1 max-w-2xl pt-24 pb-28 px-6 sm:px-8 text-center mx-auto">
        <div className="mt-8 h-64 w-full flex justify-center">
          <img src={aboutpic} className="h-64 w-auto" alt="About" />
        </div>
        <h2 className="text-3xl font-semibold text-gray-700 py-4">
          Hi,{" "}
          <span className="bg-indigo-400 text-white rounded px-1">
            I’m Amey Gupta
          </span>
          . Nice to meet you.
        </h2>
        <p className="text-gray-600 mt-4 text-base sm:text-lg md:text-xl">
          I am a self taught developer currently pursuing B.Tech in Information
          Technology in IIIT Sonepat. My field of interest includes learning new
          Web Technologies and Frameworks to develop products that solve real
          life problems.
        </p>

        <div className="text-center pt-8">
          <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center sm:text-xl space-x-2 rounded">
            <FaLaptop />
            <a
              rel="noopener noreferrer"
              target="_blank"
              href="https://my-portfolio-amey-iiit-12.vercel.app/"
            >
              See My Works
            </a>
          </button>

          <button className="bg-indigo-500 px-3 py-1 font-semibold text-white inline-flex items-center sm:text-xl space-x-2 rounded ml-3">
            <FaLinkedin />
            <a
              className="linkedin-follow-button"
              rel="noopener noreferrer"
              target="_blank"
              href="https://www.linkedin.com/in/amey-gupta-282763210/"
            >
              Follow Me
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;

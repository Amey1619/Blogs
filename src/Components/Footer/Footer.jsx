import { SiGithub } from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";

function Footer() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="relative w-full bottom-0">
      <div className="bg-indigo-600">
        <div className="flex flex-col md:flex-row items-center justify-between mx-auto py-4 px-6 md:px-12">
          <p className="text-gray-50 text-center md:text-left text-lg md:text-xl">
            © {year} Bits-Of-C0de —
            <a
              className="text-gray-50 ml-1"
              target="_blank"
              rel="noopener noreferrer"
              href="#"
            >
              @ameygupta
            </a>
          </p>
          <div className="inline-flex mt-2 md:mt-0">
            <a
              className="ml-3 text-gray-50"
              href="https://github.com/Amey1619"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiGithub className="text-2xl" />
            </a>
            <a
              className="ml-3 text-gray-50"
              href="https://www.linkedin.com/in/amey-gupta-282763210/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

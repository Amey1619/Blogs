import { SiGithub } from "react-icons/si";
import { FiLinkedin } from "react-icons/fi";

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <footer className="relative w-full -bottom-0">
      <div className="bg-indigo-600">
        <div className="mx-1 py-2 px-3 flex">
          <p className="text-gray-50 text-xl flex text-center items-left">
            © {year} Bits-Of-C0de —
            <a className="text-gray-50 ml-1" target="_blank">
              @ameygupta
            </a>
          </p>
          <span className="inline-flex ml-auto mr-2 mt-2 justify-end">
            <a
              className="ml-6 text-gray-50"
              href="https://github.com/Amey1619"
              rel="noopener noreferrer"
              target="_blank"
            >
              <SiGithub className="text-xl" />
            </a>
            <a
              className="ml-4 text-gray-50"
              href="https://www.linkedin.com/in/amey-gupta-282763210/"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FiLinkedin className="text-xl" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

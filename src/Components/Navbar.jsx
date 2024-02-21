import { BiTerminal } from "react-icons/bi";
import { CgUserlane } from "react-icons/cg";
import { AiOutlineGoogle } from "react-icons/ai";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <header className="w-xl bg-white fixed top-0 left-0 z-10">
      <nav className="mx-0 bg-white flex fixed w-full px-4 py-6 shadow border-t-4 border-indigo-600">
        <div className="mx-3 flex">
          <div className="mx-1 flex items-center justify-between hover:text-indigo-600 cursor-pointer">
            <span className="font-semibold">
              <BiTerminal className="text-3xl" />
            </span>
            <span className=" mx-2 text-2xl font-semibold">
              <Link to="/">Blogs</Link>
            </span>
          </div>
        </div>
        <div className="mx-2 flex-1">
          <div className="mx-1 flex items-center hover:text-indigo-600 cursor-pointer">
            <span className="font-semibold">
              <CgUserlane className="text-3xl" />
            </span>
            <span className=" mx-2 text-2xl font-semibold">
              <Link to="/about">About me</Link>
            </span>
          </div>
        </div>
        <div className="flex">
          <a className="mr-5 flex items-center justify-end hover:text-indigo-600">
            <span className="md:flex items-center">
              <span className="hidden md:block text-xl font-medium cursor-pointer">
                Sign Out
              </span>
              <AiOutlineGoogle className="text-xl mx-1" />
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;

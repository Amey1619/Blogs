import { BiTerminal } from "react-icons/bi";
import { CgUserlane } from "react-icons/cg";
import { AiOutlineGoogle } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { auth, provider } from "../../Firebase/Firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeUser, removeUser } from "../../Store/User";
import Alert from "../Alert";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.user !== undefined);
  const [viewAlert, setViewAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      dispatch(storeUser(userData));
    }
  }, [dispatch]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        localStorage.removeItem("user");
        setViewAlert(true);
        setAlertMessage("Hope to see you again !!");
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((res) => {
        const userObj = {
          name: res.user.displayName,
          photo: res.user.photoURL,
          token: res.user.accessToken,
          uid: res.user.uid,
        };
        localStorage.setItem("user", JSON.stringify(userObj));
        dispatch(storeUser(userObj));
        setViewAlert(true);
        setAlertMessage(`Hello ${res.user.displayName}`);
        setTimeout(() => {
          setViewAlert(false);
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

return (
  <>
    <Alert show={viewAlert} type="success" message={alertMessage} />
    <header className="fixed w-full bg-white top-0 left-0 z-10 shadow border-t-4 border-indigo-600">
      <nav className="bg-white flex items-center justify-between w-full px-4 py-6 shadow">
        <div className="flex items-center hover:text-indigo-600 cursor-pointer">
          <span className="font-semibold">
            <BiTerminal className="text-3xl" />
          </span>
          <span className="mx-2 text-2xl font-semibold">
            <Link to="/">Blogs</Link>
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center hover:text-indigo-600 cursor-pointer">
            <span className="font-semibold">
              <CgUserlane className="text-3xl" />
            </span>
            <span className="mx-2 text-2xl font-semibold">
              <Link to="/about">About me</Link>
            </span>
          </div>
          <button
            className="flex items-center justify-end cursor-pointer hover:text-indigo-600"
            onClick={isLogin ? handleSignOut : handleSignIn}
          >
            <span className="flex items-center">
              <span className="hidden md:block text-xl font-semibold">
                {isLogin ? "Sign Out" : "Sign In"}
              </span>
              {isLogin ? (
                <IoLogOutOutline className="text-xl mx-1" />
              ) : (
                <AiOutlineGoogle className="text-xl mx-1" />
              )}
            </span>
          </button>
        </div>
      </nav>
    </header>
  </>
);

}

export default Navbar;

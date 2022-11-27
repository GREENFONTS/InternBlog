import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";

const Nav = ({ isAuth, setIsAuth }) => {
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <nav className="bg-gray-900 flex justify-around items-center w-full h-[70px] text-white font-bold">
      <div className="sm:w-1/2 xl:w-1/4 flex justify-between items-center">
        <Link to="/">
          <h3 className="text-sm sm:text-md md:text-2xl font-sans">
            Home
          </h3>
        </Link>

        {!isAuth ? (
          <Link to="/login">
            <h3 className="text-sm sm:text-md md:text-2xl font-sans">
              Login
            </h3>
          </Link>
        ) : (
          <>
            <Link to="/createpost">
              <h3 className="text-sm sm:text-md md:text-2xl font-sans">
                Create Post
              </h3>
            </Link>
            <button onClick={signUserOut}>
              <h3 className="text-sm sm:text-md md:text-2xl font-sans">
                Log Out
              </h3>
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;

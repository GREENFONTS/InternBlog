import React, {useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { GlobalContext } from "../App";

const Nav = () => {
  const {isAuth, setIsAuth} = useContext(GlobalContext)

  const navigate = useNavigate()
  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      navigate("/login")
    });
  };

  return (
    <nav className="bg-gray-900 flex justify-around items-center w-full h-[70px] text-white font-bold">
      <div className="w-full  mx-9 sm:mx-0 sm:w-1/2 lg:w-1/3 flex justify-between items-center">
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

import React from "react";
import { auth, provider } from "../firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="flex flex-col gap-y-9 justify-center p-3 items-center shadow w-1/9 sm:w-1/2 xl:w-1/3 mx-auto h-[400px]">
        <div className="flex flex-col gap-y-6 justify-center items-center">
          <h2 className="font-sans text-2xl md:text-3xl font-semibold">Welcome back 😊</h2>
          <p className="font-sans text-md md:text-xl font-medium">Continue with Google</p>
        </div>
        <button className="shadow p-3 md:p-5 m-3 rounded-lg bg-blue-400" onClick={signInWithGoogle}>
        <h2 className="font-sans text-xl md:text-3xl font-semibold text-white">Sign in with Google</h2>
        </button>
      </div>
    </div>
  );
}

export default Login;

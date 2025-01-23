import React, { useState } from "react";
import "./Signin.css";
import { Navigate } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../firebase/auth";
import { useAuth } from "../context/authContext";

const SignInForm = () => {
  const { userLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    setErrorMessage(""); // Clear any previous errors
    try {
      await doSignInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error("Sign-in error:", error);
      setErrorMessage("Failed to sign in. Please check your credentials.");
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
    } catch (error) {
      setErrorMessage("Google sign-in failed. Please try again.");
      setIsSigningIn(false);
    }
  };
  if (userLoggedIn === undefined) {
    return <div className="text-center mt-10">Loading...</div>; // Show loading state
  }
  if (userLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="signin-form-container">
      <form
        onSubmit={handleEmailSignIn}
        className="form-wrapper"
      >
        <h2 className="text-2xl font-bold text-center text-white-800 mb-6">
          Sign In
        </h2>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-white-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {errorMessage && (
          <p className="mb-4 text-sm text-red-600 font-semibold">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={isSigningIn}
          className={`w-full py-2 px-4 mb-4 text-white font-medium rounded-lg ${
            isSigningIn
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-400 transition duration-300"
          }`}
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isSigningIn}
          className={`w-full py-2 px-4 flex items-center justify-center gap-2 font-medium rounded-lg border text-gray-900 ${
            isSigningIn
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white hover:bg-gray-50 border-gray-300 focus:ring-2 focus:ring-indigo-400 transition duration-300"
          }`}
        >
          {isSigningIn ? (  
            "Signing In..."
          ) : (
            <>
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_17_40)">
                  <path
                    d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z"
                    fill="#4285F4"
                  />
                  <path
                    d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z"
                    fill="#34A853"
                  />
                  <path
                    d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z"
                    fill="#FBBC04"
                  />
                  <path
                    d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z"
                    fill="#EA4335"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_17_40">
                    <rect width="48" height="48" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Sign in with Google
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;

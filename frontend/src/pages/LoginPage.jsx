import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {useNavigate} from "react-router-dom"
export default function LoginPage() {
  const [loginCred, setLoginCred] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const { login,user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginCred((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Login data:", loginCred);

    try {
      const result = await login(loginCred);
      console.log("result", result);
      console.log(user)

      if (result.status==="success") {
        console.log("Logged in, redirecting or updating UI...");
        navigate('/');

        
      } else {
        console.warn("Login failed:", result?.error || "Unknown error");
      }
    } catch (error) {
      // this block will run if login throws (we return structured errors, so usually won't throw)
      console.error("Unexpected error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    console.log(`Login with ${provider}`);
    // Handle social login logic here
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Gradient Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-orange-500 via-pink-500 to-blue-400">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%)
            `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative">
              <div className="absolute w-64 h-64 border-4 border-yellow-300 opacity-30 transform rotate-12"></div>
              <div className="absolute w-48 h-48 border-4 border-yellow-400 opacity-40 transform -rotate-6 left-8 top-8"></div>
              <div className="absolute w-32 h-32 bg-yellow-300 opacity-20 transform rotate-45 left-16 top-16"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 lg:p-12 bg-white">
        <div className="w-full max-w-md">
          {/* WIRED Logo */}
          <div className="text-center lg:mt-6 mt-16 mb-8 lg:mb-12">
            <h1 className="text-xl sm:text-3xl tracking-widest font-bold">
              {[
                "C",
                "U",
                "R",
                "A",
                "T",
                "I",
                "V",
                "E",
                "P",
                "O",
                "I",
                "N",
                "T",
              ].map((letter, index) => (
                <span
                  key={index}
                  className="inline-block bg-black text-white px-1 py-1 mx-0.5"
                  style={{ fontFamily: "'Courier New', monospace" }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 lg:mb-8 text-gray-900">
            Sign in or create an account
          </h2>

          {/* Terms Text */}
          <p className="text-xs sm:text-sm text-gray-600 text-center mb-6 lg:mb-8 leading-relaxed px-2">
            By continuing, including through our platform partners, you agree to
            our{" "}
            <a href="#" className="underline hover:text-gray-900">
              User Agreement
            </a>{" "}
            (including{" "}
            <a href="#" className="underline hover:text-gray-900">
              class action waiver and arbitration provisions
            </a>
            ) and acknowledge our{" "}
            <a href="#" className="underline hover:text-gray-900">
              Privacy Policy
            </a>
            .
          </p>

          {/* Email Input Section */}
          <div className="space-y-4 lg:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                value={loginCred.email}
                onChange={handleChange}
                placeholder="abc@gmail.com"
                className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all"
              />
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                password
              </label>
              <input
                type="password"
                name="password"
                value={loginCred.password}
                onChange={handleChange}
                placeholder="your password here"
                className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900 focus:outline-none transition-all"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-black text-white py-3 px-6 font-medium tracking-wider hover:bg-gray-800 transition-colors uppercase text-sm flex items-center justify-center"
            >
              {loading ? (
                <>
                  <span className="mr-2">
                    <svg
                      className="h-5 w-5 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </span>
        
                </>
              ) : (
                "Continue with Email"
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center my-6 lg:my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4">
            {/* Google Button */}
            <button
              onClick={() => handleSocialLogin("Google")}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                Google
              </span>
            </button>

            {/* Apple Button */}
            <button
              onClick={() => handleSocialLogin("Apple")}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                Apple
              </span>
            </button>

            {/* Facebook Button */}
            <button
              onClick={() => handleSocialLogin("Facebook")}
              className="flex items-center justify-center px-4 py-3 border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-xs sm:text-sm font-medium uppercase tracking-wide">
                Facebook
              </span>
            </button>
          </div>

          {/* Cookie Preferences Link */}
          <div className="mt-8 lg:mt-12 text-center">
            <a
              href="#"
              className="text-sm text-gray-600 underline hover:text-gray-900"
            >
              Manage cookies preferences
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

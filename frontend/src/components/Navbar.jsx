import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { categoryApi } from "../api/api.js";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const initial = user?.name?.[0]?.toUpperCase() || "";
  const [categories, setCategories] = useState([]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    handleCategory();
  }, []);

  const handleCategory = async () => {
    try {
      const { data } = await categoryApi.getAllCategory();
      if (data.status === "success") {
        const category = data.data;
        // expect "category" to be an array of { name }
        setCategories(Array.isArray(category) ? category : []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="sticky top-0 z-10 bg-amber-50 shadow-sm w-full p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <GiHamburgerMenu className="cursor-pointer" size={28} color="#333" />
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center gap-6 font-semibold text-gray-800">
          <Link to="/">Home</Link>
          {/* Category with hover dropdown */}
          <div className="relative group">
            <div className="relative group">
              {/* Trigger Button */}
              <button className=" items-center gap-2 text-gray-800 font-semibold hover:text-black transition">
                Category
              </button>

              {/* Dropdown */}
              <div className="absolute -left-80 w-[900px] rounded-md bg-gray-100 shadow-lg border-t border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out z-30">
                {categories.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-gray-600 text-center">
                    No categories available
                  </div>
                ) : (
                  <div className=" px-6 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {categories.map((cat) => (
                      <Link
                        key={cat._id || cat.name}
                        to={`/category/${encodeURIComponent(cat.name)}`}
                        className=" p-2 rounded-lg border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-200"
                      >
                        <h3 className="text-gray-900 font-medium text-sm">
                          {cat.name}
                        </h3>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Link to="/contact">Contact</Link>
          <Link to="/about">About</Link>
        </div>

        {/* Right: Auth section */}
        <div>
          {user ? (
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="w-10 h-10 rounded-full bg-black flex justify-center items-center text-white text-xl font-bold">
                {initial}
              </div>
              <span className="hidden sm:block font-medium">Logout</span>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 border-2 border-black bg-black rounded-lg text-white font-semibold hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

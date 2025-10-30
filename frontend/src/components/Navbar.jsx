import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from 'react-router-dom';
// const categories = [
//     'Technology',
//     'Lifestyle',
//     'Travel',
//     'Food & Recipes',
//     'Health & Fitness',
//     'Business',
//     'Entertainment'
//   ];

function Navbar() {
  return (
    <nav className="absolute top-0 z-10 bg-amber-50 w-full p-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <GiHamburgerMenu className='cursor-pointer' size={28} color="#333" />
          <img src="logo.png" alt="logo" className="h-10 w-auto" />
        </div>

        {/* center side */}
        <div className='flex items-center gap-4 font-bold'>
            <div><Link to={"#"}>Home</Link></div>
            <div><Link to={"#"}>Category</Link></div>
            <div><Link to={"#"}>Contact</Link></div>
            <div><Link to={"#"}>About Us</Link></div>
            

        </div>

        {/* Right side (optional future links, buttons, etc.) */}
        <div className='mr-4'>
          {/* Add nav links or buttons here */}
          <div className='w-20 p-3 border-2 bg-black cursor-pointer rounded-lg text-center text-white font-bold h-full'>Login</div>
        </div>
      </div>
    </nav>
  );
}


export default Navbar

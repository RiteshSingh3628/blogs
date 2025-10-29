import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { IoLocationSharp } from 'react-icons/io5';
import { BsTelephoneFill } from 'react-icons/bs';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">About Curated Point</h3>
            <p className="text-sm leading-relaxed mb-4">
              Discover insightful articles, thought-provoking stories, and expert perspectives on topics that matter to you.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors duration-300">
                <FaFacebookF size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <FaTwitter size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <FaLinkedinIn size={20} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-300">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Latest Posts
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Travel
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Health & Wellness
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                  Business
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <IoLocationSharp className="mt-1 mr-3 shrink-0" size={18} />
                <span className="text-sm">123 Blog Street, Content City, CC 12345</span>
              </li>
              <li className="flex items-center">
                <MdEmail className="mr-3 shrink-0" size={18} />
                <a href="mailto:info@Curated Point.com" className="text-sm hover:text-white transition-colors duration-300">
                  info@Curatedpoint.com
                </a>
              </li>
              <li className="flex items-center">
                <BsTelephoneFill className="mr-3 shrink-0" size={16} />
                <a href="tel:+1234567890" className="text-sm hover:text-white transition-colors duration-300">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <p className="text-sm text-center md:text-left">
              © {currentYear} Curated Point. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex space-x-6">
              <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-sm hover:text-white transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
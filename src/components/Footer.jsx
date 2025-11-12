import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/TasteTribe_Logo.png";
import bgImg from "../assets/KnifeIcon.jpg";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div
      data-aos="slide-up"
      className="bg-base-200 text-base-content p-10 relative overflow-hidden"
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:-translate-x-1/4 translate-y-1/4 opacity-10 transition-all duration-300 ease-in-out">
        <img className="w-[750px]" src={bgImg} alt="KnifeIcon" />
      </div>
      <div className="hidden lg:block absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 opacity-10">
        <img src={bgImg} className="w-[750px]" alt="KnifeIcon" />
      </div>

      <div className="container mx-auto z-10">
        {/* Top Section: Logo and Brand Name */}
        <div className="flex flex-col items-center justify-center mb-10">
          <img src={logo} className="w-20" alt="logo" />
          <h2 className="text-3xl font-bold text-gradient tracking-wider mt-2">
            TasteTribe
          </h2>
          <p className="text-sm text-base-content">FLAVOR EXPLORERS</p>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-secondary">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li>
                <p className="flex items-center justify-center sm:justify-start">
                  <span className="mr-2">📍</span> 123 Flavor Ave, Foodville, TX
                  54321
                </p>
              </li>
              <li>
                <a
                  href="tel:5551234567"
                  className="hover:text-primary transition-colors duration-300 flex items-center justify-center sm:justify-start"
                >
                  <span className="mr-2">📞</span> (555) 123-4567
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@tastetribe.com"
                  className="hover:text-primary transition-colors duration-300 flex items-center justify-center sm:justify-start"
                >
                  <span className="mr-2">✉️</span> hello@tastetribe.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-secondary">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/all-reviews"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Reviews
                </Link>
              </li>
              <li>
                <Link
                  to="/add-review"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Make A Review
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Latest News */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-secondary">
              Latest News
            </h3>
            <ul className="space-y-4">
              <li>
                <p className="text-xs text-accent">NOVEMBER 05, 2025</p>
                <a
                  href="#"
                  className="font-bold hover:text-primary transition-colors duration-300"
                >
                  TOP RESTAURANTS TO VISIT
                </a>
              </li>
              <li>
                <p className="text-xs text-accent">OCTOBER 28, 2025</p>
                <a
                  href="#"
                  className="font-bold hover:text-primary transition-colors duration-300"
                >
                  A FOODIES JOURNEY
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Our Community */}
          <div>
            <h3 className="font-bold text-lg mb-4 uppercase tracking-wider text-secondary">
              Our Tribe
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Our Partner Restaurants
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  The Food Cause
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/tours"
                  className="hover:text-primary transition-colors duration-300"
                >
                  Community Cooking Classes
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Social Media and Copyright */}
        <div className="mt-12 pt-8 border-t border-base-300 text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-content h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-content h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-content h-10 w-10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors duration-300"
            >
              <FaXTwitter />
            </a>
          </div>
          <p className="text-sm text-base-content">
            &copy; {new Date().getFullYear()} TasteTribe Interactive All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

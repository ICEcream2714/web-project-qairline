import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-10">
          {/* Column 1 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About us</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Our story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Media Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Sustainability
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Customer Support</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Feedback
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Explore</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Destinations
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Offers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Plan your trip
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-gray-600 transition duration-200"
                >
                  Student Club
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h2 className="text-lg font-semibold mb-4">Follow us</h2>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-gray-600 transition">
                  <i className="fab fa-facebook-f"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition">
                  <i className="fab fa-twitter"></i> Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-600 transition">
                  <i className="fab fa-instagram"></i> Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Qatar Airways. All rights reserved.
          </p>
          <ul className="flex space-x-4 text-sm text-gray-600">
            <li>
              <a href="#" className="hover:text-gray-500">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-500">
                Accessibility
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

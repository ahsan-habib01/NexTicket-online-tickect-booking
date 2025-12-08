import React from 'react';
import { Link } from 'react-router';
import Logo from '../Navbar/Logo';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="
      bg-[#fff7f0] 
      dark:bg-[#0e0e0e]
      transition-all duration-300
    "
    >
      {/* Main Footer */}
      <div className="w-11/12 mx-auto py-12 grid md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Column 1 */}
        <div>
          <Logo />
          <p className="text-sm text-black/80 dark:text-white/80 mt-3 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Book bus, train, launch & flight tickets easily.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
            Quick Links
          </h3>
          <ul className="space-y-2 text-black/80 dark:text-white/80">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/tickets"
                className="hover:text-primary transition-colors"
              >
                All Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
            Contact Info
          </h3>
          <ul className="space-y-3 text-black/80 dark:text-white/80">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope />
              <span>support@nexticket.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaPhone />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaFacebook />
              <a
                href="https://facebook.com"
                target="_blank"
                className="hover:text-primary"
              >
                Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black dark:text-white">
            Payment Methods
          </h3>

          <div className="flex justify-center md:justify-start">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Stripe_Logo%2C_revised_2016.svg"
              alt="Stripe"
              className="h-8 opacity-90 dark:invert"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-11/12 mx-auto border-t border-black/20 dark:border-white/20 text-center py-4 text-sm text-black/80 dark:text-white/80">
        © 2025{' '}
        <span className="font-semibold text-black dark:text-white">
          NexTicket
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

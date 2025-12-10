import React from 'react';
import { Link } from 'react-router';
import Logo from '../Navbar/Logo';
import { FaFacebook, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 transition-colors duration-300">
      {/* Main Footer */}
      <div className="w-11/12 mx-auto py-12 grid md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Column 1: Logo & Description */}
        <div>
          <Logo />
          <p className="text-sm text-base-content/70 mt-3 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Book bus, train, launch & flight tickets easily. Your journey starts
            here!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-base-content">
            Quick Links
          </h3>
          <ul className="space-y-2 text-base-content/70">
            <li>
              <Link
                to="/"
                className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-tickets"
                className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1"
              >
                All Tickets
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-primary transition-colors duration-200 inline-block hover:translate-x-1"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-base-content">
            Contact Info
          </h3>
          <ul className="space-y-3 text-base-content/70">
            <li className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors">
              <FaEnvelope className="text-primary" />
              <span>support@nexticket.com</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2 hover:text-primary transition-colors">
              <FaPhone className="text-primary" />
              <span>+880 1234-567890</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaFacebook className="text-primary" />
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Facebook Page
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Payment Methods */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-base-content">
            Payment Methods
          </h3>
          <div className="flex justify-center md:justify-start items-center gap-3">
            <div className="bg-base-100 p-3 rounded-lg border border-base-300 hover:border-primary transition-colors">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4f/Stripe_Logo%2C_revised_2016.svg"
                alt="Stripe"
                className="h-6 w-auto opacity-90 dark:invert"
              />
            </div>
          </div>
          <p className="text-xs text-base-content/50 mt-3 text-center md:text-left">
            Secure payments powered by Stripe
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-300">
        <div className="w-11/12 mx-auto text-center py-4 text-sm text-base-content/70">
          © 2025 <span className="font-semibold text-primary">NexTicket</span>.
          All rights reserved. Made with ❤️ for travelers
        </div>
      </div>
    </footer>
  );
};

export default Footer;

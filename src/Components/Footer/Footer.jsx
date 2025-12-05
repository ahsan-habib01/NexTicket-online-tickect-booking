import React from 'react';
import { Link } from 'react-router';
import { FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Logo from '../Navbar/Logo';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#ffd9b8] via-[#ffe8d2] to-[#ffd9b8] dark:from-[#1a1a1a] dark:via-[#111] dark:to-[#000]  transition-all duration-500">
      {/* Main Footer */}
      <div className="w-11/12 mx-auto py-12 grid md:grid-cols-3 gap-10 text-center md:text-left">
        <div>
          <Logo />
          <p className="text-sm text-black/90 dark:text-white/90 mt-3 max-w-sm mx-auto md:mx-0 leading-relaxed">
            Freelify bridges the gap between talented freelancers and clients
            across the globe — turning ideas into impactful projects.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-black/90 dark:text-white/90 tracking-wide">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to=""
                className="text-black/90 dark:text-white/90 hover:text-[#ff9346] hover:translate-x-1 inline-block transition-all duration-300"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-black/90 dark:text-white/90 hover:text-[#ff9346] hover:translate-x-1 inline-block transition-all duration-300"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to=""
                className="text-black/90 dark:text-white/90 hover:text-[#ff9346] hover:translate-x-1 inline-block transition-all duration-300"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3  tracking-wide">
            Follow Us
          </h3>
          <div className="flex justify-center md:justify-start gap-5">
            {[
              { icon: <FaInstagram />, link: 'https://instagram.com' },
              { icon: <FaFacebook />, link: 'https://facebook.com' },
              { icon: <FaPinterest />, link: 'https://pinterest.com' },
              { icon: <FaXTwitter />, link: 'https://x.com' },
            ].map((social, i) => (
              <a
                key={i}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-black/10 dark:bg-white/10 hover:bg-[#ff9346]/20 hover:text-[#ff9346] text-black/90 dark:text-white/90 hover:scale-110 transform transition-all duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-11/12 mx-auto border-t border-black/20 dark:border-white/20 text-center py-4 text-sm text-black/90 dark:text-white/90">
        © 2025{' '}
        <span className="font-semibold text-black/90 dark:text-white/90 hover:text-[#ff9346] transition-colors duration-300">
          Freelify
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

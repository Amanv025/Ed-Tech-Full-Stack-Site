// Footer.jsx

import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-4">
          <p className="text-lg mb-2">123 Education Lane, Learning City, LC 12345</p>
          <p className="text-lg mb-4">Contact Us: (123) 456-7890</p>
        </div>
        <div className="flex justify-center mb-4">
          <a href="https://facebook.com" className="mx-2 text-white hover:text-gray-300">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="mx-2 text-white hover:text-gray-300">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="mx-2 text-white hover:text-gray-300">
            <FaInstagram size={24} />
          </a>
          <a href="https://linkedin.com" className="mx-2 text-white hover:text-gray-300">
            <FaLinkedin size={24} />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          &copy; 2024 LearnTech. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

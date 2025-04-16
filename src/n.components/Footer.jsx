import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import footerLogo from '../assets/Picsart_25-03-16_19-54-07-179.png';

const Footer = () => {
  return (
    <>
      <div id="footer" className="relative z-10">
        <div id="f1" className="relative z-10">
          <img
            src={footerLogo}
            alt="Footer Logo"
            className="scale-[2]"
          />
        </div>
        <div id="f2" className="relative z-10">
          <Link to="/all-items">
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">Collections</h3>
          </Link>
          <Link to="/sell">
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">Sell</h3>
          </Link>
          <Link to="/studymaterials">
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">Study Materials</h3>
          </Link>
        </div>
        <div id="f3" className="relative z-10">
          <Link to="/library">
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">Library</h3>
          </Link>
          <Link to="#" onClick={(e) => {e.preventDefault(); document.getElementById('aboutUsModal').showModal()}}>
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">
              About Us
            </h3>
          </Link>
          <Link to="#" onClick={(e) => {e.preventDefault(); document.getElementById('contactUsModal').showModal()}}>
            <h3 className="cursor-pointer hover:text-gray-300 transition-colors">
              Contact Us
            </h3>
          </Link>
        </div>
        <div id="f4" className="relative z-10">
          <h4 className="text-sm md:text-base">
            Priyanshu Ranjan Mishra <br />
            Ashmin kumar Behera<br />
            Razzaq Mahammed<br />
          </h4>
        </div>
      </div>

      <dialog id="aboutUsModal" className="modal bg-black/95 backdrop-blur-md p-6 rounded-lg max-w-2xl mx-auto">
        <div className="modal-content text-white">
          <h2 className="text-3xl font-bold mb-6 text-green-400">About The Team</h2>
          <div className="team-members grid gap-6">
            <div className="member bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <h3 className="text-xl font-bold mb-2">Priyanshu Ranjan Mishra</h3>
              <p className="text-green-400">Full Stack Developer | UI/UX Designer</p>
            </div>
            <div className="member bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <h3 className="text-xl font-bold mb-2">Ashmin Kumar Behera</h3>
              <p className="text-green-400">Frontend Developer | Animation Specialist</p>
            </div>
            <div className="member bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <h3 className="text-xl font-bold mb-2">Razzaq Mahammed</h3>
              <p className="text-green-400">Backend Developer | Database Expert</p>
            </div>
          </div>
          <p className="team-description my-6 text-gray-300">
            We are a passionate team of developers who came together during our college years. 
            Our shared love for books and technology led us to create EcoScholar - a platform 
            that bridges the gap between readers and resources.
          </p>
          <button 
            onClick={() => document.getElementById('aboutUsModal').close()}
            className="modal-close w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors cursor-pointer select-none"
          >
            Close
          </button>
        </div>
      </dialog>

      <dialog id="contactUsModal" className="modal bg-black/95 backdrop-blur-md p-6 rounded-lg max-w-2xl mx-auto">
        <div className="modal-content text-white">
          <h2 className="text-3xl font-bold mb-6 text-green-400">Connect With Us</h2>
          <div className="social-links grid grid-cols-2 gap-4 mb-6">
            <a href="https://github.com/your-github" target="_blank" rel="noopener noreferrer" 
              className="social-link flex items-center gap-2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <FaGithub size={24} /> GitHub
            </a>
            <a href="https://linkedin.com/in/your-linkedin" target="_blank" rel="noopener noreferrer" 
              className="social-link flex items-center gap-2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <FaLinkedin size={24} /> LinkedIn
            </a>
            <a href="https://twitter.com/your-twitter" target="_blank" rel="noopener noreferrer" 
              className="social-link flex items-center gap-2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <FaTwitter size={24} /> Twitter
            </a>
            <a href="https://instagram.com/your-instagram" target="_blank" rel="noopener noreferrer" 
              className="social-link flex items-center gap-2 bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all">
              <FaInstagram size={24} /> Instagram
            </a>
          </div>
          <div className="contact-info text-center mb-6">
            <p className="text-gray-300 mb-2">📧 Email: team@lumeleaf.com</p>
            <p className="text-gray-300">📞 Phone: +91 1234567890</p>
          </div>
          <button 
            onClick={() => document.getElementById('contactUsModal').close()}
            className="modal-close w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition-colors cursor-pointer select-none"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default Footer; 

import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Github, Linkedin, MessageCircleCode, Rss } from 'lucide-react';
import { FaWhatsapp, FaXTwitter } from 'react-icons/fa6';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <Link to="/" className="inline-block">
              <span className="font-serif text-2xl font-bold text-white">Times Roman</span>
            </Link>
            <p className="mt-3 text-sm text-gray-400">
              Next-generation AI-powered news platform delivering fresh, unbiased perspectives.
            </p>
            <div className="mt-4 flex space-x-4">
              <a href="https://x.com/timesroman_in" className="text-gray-400 hover:text-white" aria-label="Follow us on X (Twitter)">
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a href="https://www.linkedin.com/company/times-roman/" className="text-gray-400 hover:text-white" aria-label="Connect on LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/timesroman.in/" className="text-gray-400 hover:text-white" aria-label="Follow us on Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://whatsapp.com/channel/0029VbApDCe6GcG9wAYtkN0p" className="text-gray-400 hover:text-white" aria-label="Join our WhatsApp channel">
                <FaWhatsapp className="h-5 w-5" />
              </a>
              <Link to="/rss.xml" className="text-gray-400 hover:text-white" aria-label="Subscribe to RSS feed">
                <Rss className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/category/politics" className="text-gray-400 hover:text-white transition-colors">Politics</Link>
              </li>
              <li>
                <Link to="/category/technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link>
              </li>
              <li>
                <Link to="/category/business" className="text-gray-400 hover:text-white transition-colors">Business</Link>
              </li>
              <li>
                <Link to="/category/science" className="text-gray-400 hover:text-white transition-colors">Science</Link>
              </li>
              <li>
                <Link to="/category/health" className="text-gray-400 hover:text-white transition-colors">Health</Link>
              </li>
              <li>
                <Link to="/category/entertainment" className="text-gray-400 hover:text-white transition-colors">Entertainment</Link>
              </li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">Disclaimer</Link>
              </li>
            </ul>
          </div>

          {/* Resources & Tools */}
          <div>
            <h3 className="mb-4 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/rss.xml" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <Rss className="h-4 w-4 mr-2" />
                  RSS Feed
                </Link>
              </li>
              <li>
                <Link to="/sitemap.xml" className="text-gray-400 hover:text-white transition-colors">Sitemap</Link>
              </li>
              <li>
                <a 
                  href="mailto:contact@timesroman.in" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <Link to="/search" className="text-gray-400 hover:text-white transition-colors">Search</Link>
              </li>
            </ul>
            
            {/* Newsletter Signup */}
            <div className="mt-6">
              <h4 className="mb-2 font-semibold text-white text-sm">Stay Updated</h4>
              <form className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-md border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                  aria-label="Email address for newsletter"
                />
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright and additional links */}
        <div className="mt-12 border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {currentYear} Times Roman. All rights reserved.
            </p>
            
            {/* Additional footer links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <Link to="/disclaimer" className="text-gray-400 hover:text-white transition-colors">
                Disclaimer
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <span className="text-gray-600">|</span>
              <Link to="/rss.xml" className="text-gray-400 hover:text-white transition-colors">
                RSS
              </Link>
            </div>
          </div>
          
          {/* Accessibility and performance notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              This website is optimized for performance and accessibility. 
              Report any issues to our{' '}
              <Link to="/contact" className="text-blue-400 hover:text-blue-300 underline">
                support team
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

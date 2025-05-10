
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import UserMenu from './UserMenu';
import SearchBar from './SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from './ui/dropdown-menu';

const mainCategories = [
  { name: "Politics", path: "/category/politics" },
  { name: "Technology", path: "/category/technology" },
  { name: "Technology News", path: "/category/technology-news" },
  { name: "Business", path: "/category/business" },
  { name: "Business News", path: "/category/business-news" },
  { name: "World News", path: "/category/world-news" },  // Replaced Science
  { name: "US News", path: "/category/us-news" },
  { name: "India News", path: "/category/india-news" },
];

const moreCategories = [
  { name: "Entertainment News", path: "/category/entertainment-news" },
  { name: "Sports News", path: "/category/sports-news" },
  { name: "Cricket", path: "/category/cricket" },
  { name: "Government News", path: "/category/government-news" },
  { name: "Press Releases", path: "/category/press-releases" },
  { name: "Science", path: "/category/science" },
  { name: "Health", path: "/category/health" },
  { name: "Entertainment", path: "/category/entertainment" },
  { name: "Lifestyle", path: "/category/lifestyle" },
  { name: "Environment", path: "/category/environment" },
];

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <span className="font-serif text-2xl font-bold tracking-tight">Times Roman</span>
            </Link>
          </div>

          {/* Navigation - Desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {/* Latest News is not in main categories but should appear first */}
              <Link
                to="/category/latest-news"
                className="text-sm font-medium text-gray-700 hover:text-black"
              >
                Latest News
              </Link>
              
              {mainCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-sm font-medium text-gray-700 hover:text-black"
                >
                  {category.name}
                </Link>
              ))}
              
              {/* More Dropdown */}
              <DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                <DropdownMenuTrigger 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-black focus:outline-none"
                  aria-label="More categories"
                >
                  More <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white w-56">
                  {moreCategories.map((category) => (
                    <DropdownMenuItem key={category.name} asChild>
                      <Link 
                        to={category.path}
                        className="w-full text-sm text-gray-700 hover:text-black"
                      >
                        {category.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* User Menu and Search */}
          <div className="flex items-center space-x-2">
            <SearchBar />
            
            {/* User Menu */}
            <UserMenu />
            
            {/* Mobile menu button */}
            <button
              className="ml-2 inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* Latest News for mobile */}
            <Link
              to="/category/latest-news"
              className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
              onClick={() => setIsMenuOpen(false)}
            >
              Latest News
            </Link>
            
            {/* Main categories for mobile */}
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            
            {/* Mobile More section - expand directly rather than using dropdown */}
            <div className="border-t border-gray-200 pt-2">
              <p className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                More Categories
              </p>
              {moreCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

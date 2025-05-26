
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
  { name: "Business", path: "/category/business" },
  { name: "World News", path: "/category/world-news" },
  { name: "Sports News", path: "/category/sports-news" },
  { name: "Entertainment", path: "/category/entertainment" },
];

// Split more categories into two columns
const moreCategories = [
  // Column 1
  [
    { name: "Entertainment News", path: "/category/entertainment-news" },
    { name: "Sports News", path: "/category/sports-news" },
    { name: "Cricket", path: "/category/cricket" },
    { name: "Government News", path: "/category/government-news" },
    { name: "Press Releases", path: "/category/press-releases" },
    { name: "Science", path: "/category/science" },
    { name: "Health", path: "/category/health" },
    { name: "US News", path: "/category/us-news" },
    { name: "Lifestyle", path: "/category/lifestyle" },
    { name: "Crime News", path: "/category/crime" },
    { name: "History", path: "/category/history" },
    { name: "Culture", path: "/category/culture" },
    { name: "Social Media", path: "/category/social" },
    { name: "Education News", path: "/category/education" },
  ],
  // Column 2
  [
    { name: "Travel", path: "/category/travel" },
    { name: "India News", path: "/category/india-news" },
    { name: "Space Exploration", path: "/category/space-expo" },
    { name: "Weather", path: "/category/weather" },
    { name: "Gaming", path: "/category/gaming" },
    { name: "Mumbai", path: "/category/mumbai" },
    { name: "Delhi", path: "/category/delhi" },
    { name: "Bangalore", path: "/category/bangalore" },
    { name: "Hyderabad", path: "/category/hyderabad" },
    { name: "Kolkata", path: "/category/kolkata" },
    { name: "Chennai", path: "/category/chennai" },
    { name: "TV News", path: "/category/tv-news" },
    { name: "Auto", path: "/category/auto" },
    { name: "War News", path: "/category/war-news" },
  ]
];

// For mobile display, flatten the arrays
const flatMoreCategories = [...moreCategories[0], ...moreCategories[1]];

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
              
              {mainCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-sm font-medium text-gray-700 hover:text-black transition-colors duration-200"
                >
                  {category.name}
                </Link>
              ))}
              
              {/* More Dropdown - Now with two columns */}
              <DropdownMenu open={isMoreOpen} onOpenChange={setIsMoreOpen}>
                <DropdownMenuTrigger 
                  className="flex items-center text-sm font-medium text-gray-700 hover:text-black focus:outline-none transition-colors duration-200"
                  aria-label="More categories"
                >
                  More <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-200 ${isMoreOpen ? 'rotate-180' : ''}`} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-white w-[600px] p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Column 1 */}
                    <div>
                      <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">Categories</h3>
                      <div className="space-y-1">
                        {moreCategories[0].map((category) => (
                          <DropdownMenuItem key={category.name} asChild className="py-1">
                            <Link 
                              to={category.path}
                              className="w-full text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md px-2 py-1 transition-colors duration-200"
                            >
                              {category.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div>
                      <h3 className="font-semibold text-xs uppercase tracking-wider text-gray-500 mb-2">More Topics</h3>
                      <div className="space-y-1">
                        {moreCategories[1].map((category) => (
                          <DropdownMenuItem key={category.name} asChild className="py-1">
                            <Link 
                              to={category.path}
                              className="w-full text-sm text-gray-700 hover:text-black hover:bg-gray-50 rounded-md px-2 py-1 transition-colors duration-200"
                            >
                              {category.name}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </div>
                    </div>
                  </div>
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
            
            {/* Main categories for mobile */}
            {mainCategories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-md"
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
              {flatMoreCategories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-black rounded-md"
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

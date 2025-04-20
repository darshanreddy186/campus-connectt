import React from 'react';
import { Bell, LogIn } from 'lucide-react';
import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';

const Navbar = () => {
  const { isSignedIn, user } = useUser();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Brand & Links */}
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-blue-700 tracking-tight">
              Campus<span className="text-gray-900">Connect</span>
            </h1>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
              {['Home', 'Events', 'About', 'Contact'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="relative text-gray-600 hover:text-blue-600 transition duration-200 after:block after:h-[2px] after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Auth & Actions */}
          <div className="flex items-center space-x-4">
            {isSignedIn && (
              <>
                <span className="text-gray-700 text-sm font-medium hidden sm:block">
                  Welcome, {user?.firstName || 'User'}!
                </span>
                <button className="relative p-2 text-gray-600 hover:text-blue-600 transition duration-200">
                  <Bell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center shadow-sm">
                    3
                  </span>
                </button>
              </>
            )}

            {isSignedIn ? (
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            ) : (
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg hover:scale-105 active:scale-95 transition transform duration-200 shadow-md">
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              </SignInButton>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

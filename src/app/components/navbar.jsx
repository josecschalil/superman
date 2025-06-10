"use client";

import { Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react"; // You can replace this with your preferred icon library

const NavBar = ({ navItems, darkMode, toggleDarkMode, onMobileMenuToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true); // 👈 state to control navbar visibility

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeout;

    const handleScroll = () => {
      clearTimeout(timeout);
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShowNavbar(true); // show when at top
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down, hide
      } else {
        setShowNavbar(true); // scrolling up, show
      }

      lastScrollY = currentScrollY;

      // Hide navbar after idle (no scroll) for 2s
      timeout = setTimeout(() => {
        if (window.scrollY !== 0) setShowNavbar(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);

  const toggleMobileMenu = () => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    onMobileMenuToggle?.(newState); // Notify parent
  };

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-100 ${
        showNavbar
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      } backdrop-blur-lg ${
        darkMode
          ? "bg-gray-900/80 border-gray-700/50"
          : "bg-white/80 border-gray-200/50"
      } border rounded-2xl shadow-lg hover:shadow-xl max-w-2xl lg:max-w-5xl w-[90%]`}
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between space-x-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              lg.presets
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                    darkMode
                      ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                      : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? "hover:bg-gray-800/60 text-gray-300"
                  : "hover:bg-gray-100/60 text-gray-700"
              }`}
            >
              {darkMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            {/* CTA - Desktop Only */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("#contact")}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode
                    ? "hover:bg-gray-800/60 text-gray-300"
                    : "hover:bg-gray-100/60 text-gray-700"
                }`}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={mobileMenuOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        <div
          className={`lg:hidden absolute top-full left-0 right-0 mt-2
      ${
        darkMode
          ? "bg-gray-900/70 backdrop-blur-2xl border-gray-700/50"
          : "bg-white/70 backdrop-blur-2xl border-gray-200/50"
      } border rounded-2xl shadow-lg overflow-hidden`}
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  scrollToSection(item.href);
                  toggleMobileMenu();
                }}
                className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  darkMode
                    ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                    : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2 ">
              <button
                onClick={() => {
                  scrollToSection("#contact");
                  toggleMobileMenu();
                }}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default NavBar;

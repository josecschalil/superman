"use client";

import { Transition } from "@headlessui/react";
import { useState, useEffect, useCallback } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
const NavBar = ({ navItems, onMobileMenuToggle }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const pathname = usePathname();
  const { isDarkMode: darkMode, toggleTheme: toggleDarkMode } =
    useThemeContext();

  const scrollToSection = useCallback(
    (id) => {
      if (id.startsWith("#")) {
        const section = document.querySelector(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }
      setMobileMenuOpen(false);
      onMobileMenuToggle?.(false);
    },
    [onMobileMenuToggle]
  );

  const toggleMobileMenu = useCallback(() => {
    const newState = !mobileMenuOpen;
    setMobileMenuOpen(newState);
    onMobileMenuToggle?.(newState);
  }, [mobileMenuOpen, onMobileMenuToggle]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId;

    const handleScroll = () => {
      clearTimeout(timeoutId);
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      lastScrollY = currentScrollY;

      timeoutId = setTimeout(() => {
        if (window.scrollY !== 0) setShowNavbar(false);
      }, 2000);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);
  const router = useRouter();
  const handleStart = () => {
    router.push("/explore");
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
      aria-label="Main navigation"
    >
      <div className="px-6 py-3">
        <div className="flex items-center justify-between space-x-8">
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              lg.presets
            </Link>
          </div>

          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {navItems.map((item) =>
                item.href.startsWith("#") ? (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode
                        ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                        : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                    }`}
                    aria-label={`Scroll to ${item.name}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                      darkMode
                        ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                        : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                    } ${
                      pathname === item.href
                        ? darkMode
                          ? "text-white"
                          : "text-gray-900"
                        : ""
                    }`}
                    aria-current={pathname === item.href ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                darkMode
                  ? "hover:bg-gray-800/60 text-gray-300"
                  : "hover:bg-gray-100/60 text-gray-700"
              }`}
              aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            >
              {darkMode ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <div className="hidden lg:block">
              <button
                onClick={handleStart}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
                aria-label="Get Started"
              >
                Get Started
              </button>
            </div>

            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className={`p-2 rounded-xl transition-all duration-200 hover:scale-110 ${
                  darkMode
                    ? "hover:bg-gray-800/60 text-gray-300"
                    : "hover:bg-gray-100/60 text-gray-700"
                }`}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
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
          className={`lg:hidden absolute top-full left-0 right-0 mt-2 ${
            darkMode
              ? "bg-gray-900/70 backdrop-blur-2xl border-gray-700/50"
              : "bg-white/70 backdrop-blur-2xl border-gray-200/50"
          } border rounded-2xl shadow-lg overflow-hidden`}
          role="menu"
        >
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) =>
              item.href.startsWith("#") ? (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                      : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                  }`}
                  role="menuitem"
                >
                  {item.name}
                </button>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    darkMode
                      ? "hover:bg-gray-800/60 hover:text-white text-gray-300"
                      : "hover:bg-gray-100/60 hover:text-gray-900 text-gray-700"
                  } ${
                    pathname === item.href
                      ? darkMode
                        ? "text-white"
                        : "text-gray-900"
                      : ""
                  }`}
                  role="menuitem"
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onMobileMenuToggle?.(false);
                  }}
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="pt-2">
              <button
                onClick={handleStart}
                className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                role="menuitem"
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

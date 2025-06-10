"use client"; // if this is Next.js app directory and this is a client component
import { useEffect, useState } from "react";
import "./globals.css";
import NavBar from "./components/navbar";
import { ThemeProvider } from "./context/ThemeContext";
import useTheme from "./hooks/darkMode";
import React from "react";
import Footer from "./components/Footer";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Support", href: "#contact" },
];

export default function RootLayout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body>
        <ThemeProvider>
          <div className="overflow-x-hidden">
            <NavBar
              navItems={navItems}
              darkMode={isDarkMode}
              toggleDarkMode={toggleTheme}
              onMobileMenuToggle={setIsMobileMenuOpen}
            />
            {isMobileMenuOpen && (
              <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-all duration-300" />
            )}
            {children}
            <Footer
              darkMode={isDarkMode}
              navItems={navItems}
              scrollToSection={scrollToSection}
            />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

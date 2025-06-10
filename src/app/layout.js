"use client"; // if this is Next.js app directory and this is a client component
import { useEffect, useState } from "react";
import "./globals.css";
import NavBar from "./components/navbar";
import { useDarkMode } from "./hooks/darkMode";
import Footer from "./components/Footer";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Explore Presets", href: "#showcase" },
  { name: "About", href: "#about" },
  { name: "Pricing", href: "#pricing" },
  { name: "Support", href: "#contact" },
];

export default function RootLayout({ children }) {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <html lang="en" className={darkMode ? "dark" : ""}>
      <body>
        <div className="overflow-x-hidden">
          <NavBar
            navItems={navItems}
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            onMobileMenuToggle={setIsMobileMenuOpen}
          />
          {isMobileMenuOpen && (
            <div className="fixed inset-0 z-40 backdrop-blur-sm bg-black/30 transition-all duration-300" />
          )}
          {children}

          <Footer
            darkMode={darkMode}
            navItems={navItems}
            scrollToSection={scrollToSection}
          />
        </div>
      </body>
    </html>
  );
}

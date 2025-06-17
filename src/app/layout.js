"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import NavBar from "./components/navbar";
import { ThemeProvider } from "./context/ThemeContext";
import useTheme from "./hooks/darkMode";
import Footer from "./components/Footer";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./hooks/useAuth";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Explore", href: "/explore" },
  { name: "About", href: "/about" },
  { name: "Guide", href: "/guide" },
  { name: "Support", href: "/support" },
];

// Visit counter hook
const useVisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);
  const [isNewSession, setIsNewSession] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sessionVisit = sessionStorage.getItem("sessionVisit");

      if (!sessionVisit) {
        sessionStorage.setItem("sessionVisit", "true");
        setIsNewSession(true);

        const storedCount = localStorage.getItem("totalVisits") || 0;
        const newCount = parseInt(storedCount) + 1;

        setVisitCount(newCount);
        localStorage.setItem("totalVisits", newCount.toString());
      } else {
        const storedCount = localStorage.getItem("totalVisits") || 0;
        setVisitCount(parseInt(storedCount));
      }
    }
  }, []);

  return { visitCount, isNewSession };
};

export default function RootLayout({ children }) {
  const { isDarkMode, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const hideNavPaths = ["/admin"];
  const { visitCount } = useVisitCounter(); // Using the visit counter

  const shouldHideNav = hideNavPaths.includes(pathname);
  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  // Optional: Log visits to your analytics
  useEffect(() => {
    console.log(`Total visits: ${visitCount}`);
    // You could send this to an analytics API here
  }, [visitCount]);

  return (
    <html lang="en" className={isDarkMode ? "dark" : ""}>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <div className="overflow-x-hidden">
              {!shouldHideNav && (
                <NavBar
                  navItems={navItems}
                  darkMode={isDarkMode}
                  toggleDarkMode={toggleTheme}
                  onMobileMenuToggle={setIsMobileMenuOpen}
                />
              )}
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
        </AuthProvider>
      </body>
    </html>
  );
}

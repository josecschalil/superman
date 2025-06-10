"use client";

import { useState, useEffect } from "react";

export const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const updateDarkMode = (newMode) => {
    setDarkMode(newMode);
    localStorage.setItem("darkMode", String(newMode));
    document.documentElement.classList.toggle("dark", newMode);
  };

  useEffect(() => {
    setIsMounted(true);
    const savedMode = localStorage.getItem("darkMode") === "true";
    updateDarkMode(savedMode);

    const handleStorageChange = (e) => {
      if (e.key === "darkMode") {
        const newMode = e.newValue === "true";
        updateDarkMode(newMode);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const toggleDarkMode = () => {
    updateDarkMode(!darkMode);
  };

  return { darkMode, toggleDarkMode, isMounted };
};

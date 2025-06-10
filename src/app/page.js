"use client";

import React from "react";
import Hero from "./components/Hero";
import { useDarkMode } from "./hooks/darkMode";

const HomePage = () => {
  const { darkMode, isMounted } = useDarkMode();

  if (!isMounted) {
    return null; // Or a loading skeleton
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Hero darkMode={darkMode} />
    </div>
  );
};

export default HomePage;

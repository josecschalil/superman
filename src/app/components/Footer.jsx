"use client";

import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function Footer({ navItems, scrollToSection }) {
  const { isDarkMode: darkMode } = useThemeContext();

  return (
    <footer
      className={`py-12 ${
        darkMode
          ? "bg-gray-900 border-gray-800 text-gray-300"
          : "bg-gray-50 border-gray-200 text-gray-600"
      } border-t`}
    >
      <div className="max-w-7xl w-[90%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Vexel
            </h3>
            <p
              className={`mb-6 max-w-md ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Creating digital experiences that drive results. From custom
              websites to full-stack applications, we bring your vision to life
              with cutting-edge technology and beautiful design.
            </p>
            <div className="flex space-x-4">
              {[Github, Linkedin, Instagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className={`p-2 rounded-lg transition-colors ${
                    darkMode ? "hover:bg-gray-800" : "hover:bg-gray-200"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4
              className={`font-semibold mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`hover:text-blue-600 transition-colors ${
                      darkMode
                        ? "text-gray-300 hover:text-blue-400"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-right sm:text-left">
            <h4
              className={`font-semibold mb-4 ${
                darkMode ? "text-gray-300" : "text-gray-800"
              }`}
            >
              Services
            </h4>
            <ul
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } space-y-2`}
            >
              <li>Custom Websites</li>
              <li>Full-Stack Development</li>
              <li>Responsive Design</li>
              <li>Performance Optimization</li>
              <li>SEO & Analytics</li>
              <li>Ongoing Support</li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-12 pt-8 border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } text-center`}
        >
          <p>© 2025 Vexel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

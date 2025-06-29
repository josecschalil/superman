"use client";

import React from "react";
import { Github, Linkedin, Instagram } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";
import { useRouter } from "next/navigation";
export default function Footer() {
  const { isDarkMode: darkMode } = useThemeContext();
  const staticNavItems = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "About", href: "/about" },
    { name: "Guide", href: "/guide" },
    { name: "Support", href: "/contact" },
  ];
  const router = useRouter();
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
              Superman's Playlist
            </h3>
            <p
              className={`mb-6 max-w-md ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              These songs aren't just melodies — they’re memories. Each one
              holds a moment, a feeling, a piece of me. They've been with me in
              silence, in joy, and in chaos. This playlist is a safe place, a
              familiar rhythm. Listen closely, you might just hear my heart
              sing.
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
              {staticNavItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => router.push(item.href)}
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
        </div>

        <div
          className={`mt-12 pt-8 border-t ${
            darkMode ? "border-gray-800" : "border-gray-200"
          } text-center text-sm text-gray-500 space-y-2`}
        >
          <p>© 2025 Superman. All rights reserved.</p>
          <div className="space-x-4">
            <a href="/privacy" className="hover:underline">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:underline">
              Terms & Conditions
            </a>
            <a href="/refund" className="hover:underline">
              Cancellation & Refund
            </a>
            <a href="/shipping" className="hover:underline">
              Shipping Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

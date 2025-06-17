"use client";

import { useState, useEffect } from "react";
import { Download, CheckCircle } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

export default function DownloadConfirmPage() {
  const { isDarkMode } = useThemeContext();
  const [countdown, setCountdown] = useState(3);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadLink, setDownloadLink] = useState("");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState(null);
  const [presetid, setPresetid] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("preset");
      setPresetid(id);
    }
  }, []);

  useEffect(() => {
    if (!isClient || !presetid) return;

    const fetchDownloadData = async () => {
      try {
        const response = await fetch(`/api/preset-packs/${presetid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch download data");
        }
        const data = await response.json();
        setDownloadLink(data.downloadLink);
        setFileName(data.title || "preset-pack");
      } catch (error) {
        console.error("Failed to fetch download data", error);
        setError(error.message);
      }
    };

    if (!localStorage.getItem(`downloaded_${presetid}`)) {
      fetchDownloadData();
    }
  }, [presetid, isClient]);

  const startDownload = () => {
    if (!downloadLink || !isClient || !presetid) return;

    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadStarted(true);
    localStorage.setItem(`downloaded_${presetid}`, "true");
    localStorage.removeItem("preset");
    setPresetid(null);
  };

  useEffect(() => {
    if (
      !isClient ||
      !presetid ||
      !downloadLink ||
      localStorage.getItem(`downloaded_${presetid}`)
    )
      return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && !downloadStarted) {
      startDownload();
    }
  }, [countdown, downloadStarted, downloadLink, presetid, isClient]);

  if (!isClient) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="text-center py-8 text-red-500">
          Error loading presets: {error}
        </div>
      </div>
    );
  }

  if (!presetid) {
    return (
      <div
        className={`flex justify-center items-center h-screen transition-colors duration-500 ${
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div
          className={`text-center p-8 rounded-2xl ${
            isDarkMode ? "bg-gray-800" : "bg-white shadow-xl"
          }`}
        >
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            {downloadStarted ? "Download Complete" : "No Download Available"}
          </h1>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {downloadStarted
              ? "Your download has been started. Check your downloads folder."
              : "No active download found. Please return to the product page."}
          </p>
          {downloadStarted && downloadLink && (
            <button
              onClick={startDownload}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isDarkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              <Download className="w-5 h-5" />
              Download Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50 text-gray-900"
      }`}
    >
      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className={`max-w-md w-full text-center p-8 rounded-2xl transition-all duration-300 ${
            isDarkMode
              ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
              : "bg-white/70 backdrop-blur-sm border border-gray-200 shadow-xl"
          }`}
        >
          {/* Success Icon */}
          <div className="mb-6">
            <CheckCircle
              className={`w-16 h-16 mx-auto ${
                isDarkMode ? "text-green-400" : "text-green-500"
              }`}
            />
          </div>

          {/* Title */}
          <h1
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Payment Successful!
          </h1>

          {/* Download Status */}
          <div className="mb-6">
            {!downloadStarted ? (
              <div>
                <p
                  className={`text-lg mb-4 ${
                    isDarkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {downloadLink
                    ? "Your download will start in a moment"
                    : "Preparing your download..."}
                </p>
                {downloadLink && (
                  <>
                    <div
                      className={`text-3xl font-bold mb-2 ${
                        isDarkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                    >
                      {countdown}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          isDarkMode ? "bg-blue-400" : "bg-blue-600"
                        }`}
                        style={{ width: `${((3 - countdown) / 3) * 100}%` }}
                      />
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                <p
                  className={`text-lg mb-4 ${
                    isDarkMode ? "text-green-400" : "text-green-600"
                  }`}
                >
                  Download started successfully!
                </p>
              </div>
            )}
          </div>

          {/* Manual Download Button */}
          {downloadLink && (
            <button
              onClick={startDownload}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 ${
                isDarkMode
                  ? "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/25"
                  : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
              }`}
            >
              <Download className="w-5 h-5" />
              {downloadStarted
                ? "Download Again"
                : "Click here if it doesn't start automatically"}
            </button>
          )}

          {/* Additional Info */}
          <p
            className={`text-sm mt-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {downloadLink
              ? "Having trouble? Check your downloads folder or contact support."
              : "Please wait while we prepare your download..."}
          </p>
        </div>
      </div>

      {/* Floating Animation Elements */}
      <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full opacity-20 animate-pulse ${
            isDarkMode ? "bg-blue-500" : "bg-blue-300"
          }`}
          style={{ animationDelay: "0s", animationDuration: "4s" }}
        />
        <div
          className={`absolute top-3/4 right-1/4 w-24 h-24 rounded-full opacity-20 animate-pulse ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        />
        <div
          className={`absolute top-1/2 right-1/3 w-16 h-16 rounded-full opacity-20 animate-pulse ${
            isDarkMode ? "bg-green-500" : "bg-green-300"
          }`}
          style={{ animationDelay: "1s", animationDuration: "4s" }}
        />
      </div>
    </div>
  );
}

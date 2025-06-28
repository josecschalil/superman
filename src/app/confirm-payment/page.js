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
  const [hasMailSent, setMailFlag] = useState(false);
  useEffect(() => {
    setIsClient(true);
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("preset");
      setPresetid(id);
      localStorage.removeItem(`downloaded_${id}`);
    }
  }, []);

  const handleMail = async (link, name) => {
    const sentMail = localStorage.getItem("downloadEmail");
    try {
      const downloadData = {
        email: sentMail,
        presetId: presetid + " - " + name,
      };
      const response = await fetch("/api/download-marker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(downloadData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save log");
      }

      const result = await response.json();
      console.log("Download log saved:", result);
    } catch (error) {
      console.error("Error creating download log:", error);
      alert("Error saving log: " + error.message);
    }

    try {
      const mailData = {
        type: "download",
        downloadLink: link,
        fileName: name || "Playlist Link",
        recipientEmail: sentMail,
      };

      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      console.log("Mail sent successfully");
      setMailFlag(true);
      return true;
    } catch (error) {
      console.error("Email sending failed:", error.message);
      return false;
    }
  };

  useEffect(() => {
    if (!isClient || !presetid) return;

    const fetchAndProcessDownload = async () => {
      try {
        const response = await fetch(`/api/preset-packs/${presetid}`);
        if (!response.ok) throw new Error("Failed to fetch download data");

        const data = await response.json();
        setDownloadLink(data.downloadLink);
        setFileName(data.title || "playlist-link");

        if (!hasMailSent) {
          await handleMail(data.downloadLink, data.title || "playlist-link");
        }
      } catch (error) {
        console.error("Download error:", error);
        setError(error.message);
      }
    };

    fetchAndProcessDownload();
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
  };

  useEffect(() => {
    if (!isClient || !presetid || !downloadLink) return;

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
        className={`flex justify-center items-center h-screen ${
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
        className={`flex justify-center items-center h-screen ${
          isDarkMode ? "bg-gray-900" : "bg-blue-50"
        }`}
      >
        <div className="text-center py-8 text-red-500">
          Error loading link: {error}
        </div>
      </div>
    );
  }

  if (!presetid) {
    return (
      <div
        className={`flex justify-center items-center h-screen ${
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
            {downloadStarted ? "Purchase Complete" : "No Data Available"}
          </h1>
          <p
            className={`mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}
          >
            {downloadStarted
              ? "Check your mail for playlist Link."
              : "No active purchase found. Please return to the product page."}
          </p>
          {downloadStarted && (
            <button
              onClick={startDownload}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isDarkMode ? "bg-blue-600 text-white" : "bg-blue-600 text-white"
              }`}
            >
              <Download className="w-5 h-5" />
              Get Link Again
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className={`max-w-md w-full text-center p-8 rounded-2xl ${
            isDarkMode
              ? "bg-gray-800/50 border border-gray-700"
              : "bg-white/70 border border-gray-200 shadow-xl"
          }`}
        >
          <div className="mb-6">
            <CheckCircle
              className={`w-16 h-16 mx-auto ${
                isDarkMode ? "text-green-400" : "text-green-500"
              }`}
            />
          </div>

          <h1
            className={`text-2xl font-bold mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Payment Successful!
          </h1>

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
                        className={`h-2 rounded-full ${
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
                  Purchased successfully!
                </p>
              </div>
            )}
          </div>

          {downloadLink && (
            <button
              onClick={startDownload}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium ${
                isDarkMode
                  ? "bg-blue-600 text-white shadow-blue-600/25"
                  : "bg-blue-600 text-white"
              }`}
            >
              <Download className="w-5 h-5" />
              {downloadStarted ? "Get Link" : "Try it again"}
            </button>
          )}

          <p
            className={`text-sm mt-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {downloadLink
              ? "Having trouble? Check your mail or contact support."
              : "Please wait while we prepare playlist..."}
          </p>
        </div>
      </div>
    </div>
  );
}

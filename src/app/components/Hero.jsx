import React from "react";
import { ArrowRight } from "lucide-react";
import { MessageCircle, Share2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Hero = ({ darkMode, scrollToSection }) => {
  const router = useRouter();
  const handleExplore = () => {
    router.push("/explore");
  };
  return (
    <section
      id="home"
      className={`pt-28 lg:pt-16 min-h-screen flex items-center relative pb-18
        ${
          darkMode
            ? `bg-gradient-to-tr from-gray-900 via-slate-800 to-gray-900 
               dark:from-gray-900 dark:via-slate-800 dark:to-gray-900`
            : `bg-gradient-to-tr from-blue-100 to-white`
        }
      `}
    >
      <div className="relative max-w-7xl mx-auto w-[87%] grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Content - 7 columns */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main heading */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl  font-bold leading-none tracking-tight">
              <span className={`block ${darkMode ? "text-gray-100" : ""}`}>
                Every
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">
                Great Edit
              </span>
              <span className={`block ${darkMode ? "text-gray-100" : ""}`}>
                Starts Here.
              </span>
            </h1>

            <div
              className={`w-24 h-1 rounded-full
                  bg-gradient-to-r from-blue-600 to-purple-600
                 `}
            ></div>
          </div>

          {/* Description */}
          <p
            className={`text-xl md:text-xl leading-relaxed max-w-2xl ${
              darkMode ? "text-gray-300" : ""
            }`}
          >
            Elevate your photos and videos with our premium presets and
            LUTs—designed to transform your edits into stunning,
            professional-grade art. Fast, easy, and endlessly inspiring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleExplore}
              className="group px-8 py-4 font-semibold rounded-2xl flex items-center justify-center sm:justify-start

                    bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300"
            >
              Explore Presets
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() =>
                window.open("https://wa.me/?text=+917012048527", "_blank")
              }
              className={`flex items-center justify-center gap-2 px-6 py-3 font-semibold rounded-xl transition-all duration-300 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              <Share2 className="w-auto h-auto  px-1 pl-2" />
              Share on WhatsApp
              <MessageCircle className="w-auto h-auto " />
            </button>
          </div>
        </div>

        {/* Right Visual Element - 5 columns */}
        <div className="lg:col-span-5 relative">
          <div className="relative">
            {/* Large card with glassmorphism effect */}
            <div
              className={`rounded-3xl p-3 sm:p-8 shadow-2xl border backdrop-blur-lg
                ${
                  darkMode
                    ? "bg-gray-800/10 border-gray-700/20"
                    : "bg-white/20 border-white/20"
                }
              `}
            >
              {/* Mock browser window */}
              <div
                className={`rounded-2xl shadow-lg overflow-hidden
                  ${darkMode ? "bg-gray-900" : "bg-white"}
                `}
              >
                {/* Browser header */}
                <div
                  className={`flex items-center px-4 py-3 border-b
                    ${
                      darkMode
                        ? "bg-gray-800 border-gray-700"
                        : "bg-gray-100 border-gray-200"
                    }
                  `}
                >
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 mx-4">
                    <div
                      className={`rounded-lg px-3 py-1 text-xs
                        ${
                          darkMode
                            ? "bg-gray-700 text-gray-400"
                            : "bg-white text-gray-500"
                        }
                      `}
                    >
                      yourwebsite.com
                    </div>
                  </div>
                </div>

                {/* Mock content */}
                <div className="p-6 space-y-4">
                  <div
                    className={`h-4 rounded animate-pulse
                      ${
                        darkMode
                          ? "bg-gradient-to-r from-blue-800 to-purple-800"
                          : "bg-gradient-to-r from-blue-200 to-purple-200"
                      }
                    `}
                  ></div>
                  <div
                    className={`h-4 rounded animate-pulse delay-75 w-3/4
                      ${
                        darkMode
                          ? "bg-gradient-to-r from-purple-800 to-teal-800"
                          : "bg-gradient-to-r from-purple-200 to-teal-200"
                      }
                    `}
                  ></div>
                  <div
                    className={`h-4 rounded animate-pulse delay-150 w-1/2
                      ${
                        darkMode
                          ? "bg-gradient-to-r from-teal-800 to-blue-800"
                          : "bg-gradient-to-r from-teal-200 to-blue-200"
                      }
                    `}
                  ></div>

                  <div className="grid grid-cols-2 gap-3 mt-6">
                    <div
                      className={`h-16 rounded-lg animate-pulse
                        ${
                          darkMode
                            ? "bg-gradient-to-br from-blue-900 to-blue-800"
                            : "bg-gradient-to-br from-blue-100 to-blue-200"
                        }
                      `}
                    ></div>
                    <div
                      className={`h-16 rounded-lg animate-pulse delay-75
                        ${
                          darkMode
                            ? "bg-gradient-to-br from-purple-900 to-purple-800"
                            : "bg-gradient-to-br from-purple-100 to-purple-200"
                        }
                      `}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div
              className={`absolute -top-4 -right-4 w-16 h-16 rounded-2xl shadow-lg animate-pulse rotate-12
                ${
                  darkMode
                    ? "bg-gradient-to-br from-yellow-400 to-orange-500"
                    : "bg-gradient-to-br from-yellow-300 to-yellow-400"
                }
              `}
            ></div>
            <div
              className={`absolute -bottom-6 -left-6 w-16 h-16 rounded-xl shadow-lg animate-pulse -rotate-12
                ${
                  darkMode
                    ? "bg-gradient-to-br from-pink-400 to-red-500"
                    : "bg-gradient-to-br from-pink-300 to-pink-400"
                }
              `}
            ></div>
          </div>

          {/* Additional floating card */}
          <div
            className={`absolute bottom-10 -right-12 rounded-2xl p-4 shadow-xl border backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform duration-300
              ${
                darkMode
                  ? "bg-gray-800/90 border-gray-700/50"
                  : "bg-white/90 border-white/50"
              }
            `}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-green-400 to-teal-500">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <div>
                <div
                  className={`text-sm font-semibold ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Performance
                </div>
                <div
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  99.9% Uptime
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
